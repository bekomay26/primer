import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import Dropdown from "./Dropdown";
import {
  transactionStatuses,
  transactionCurrencies,
  processors,
  paymentMethods,
} from "../utils";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  padding: 10px;
  display: inline-flex;
  align-items: center;
  //border: 1px solid #282c34;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  & > div {
    margin-left: 10px;
    border-right: 1px solid #282c34;
  }
  & > div:last-child {
    border-right: unset;
  }
  & > input {
    border-right: 1px solid #282c34;
  }
  justify-content: flex-end;
`;
const SearchInput = styled.input`
  padding: 5px 10px;
  font-size: 14px;
  border: unset;
  //display: flex;
  //align-items: center;
  //background: papayawhip;
`;

type QueryFields = {
  status?: string;
  method?: string;
  processor?: string;
  currencyCode?: string;
  orderId?: string;
};

const TransactionFilter = ({ payments, updatePayments }) => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("ALL");
  const [selectedProcessor, setSelectedProcessor] = useState("ALL");
  const [selectedCurrency, setSelectedCurrency] = useState("ALL");

  const onMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  const onProcessorChange = (value: string) => {
    setSelectedProcessor(value);
  };

  const onCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const onStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const onSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (payments.length) {
      getFilteredData();
    }
  }, [
    selectedMethod,
    selectedProcessor,
    selectedStatus,
    selectedCurrency,
    payments,
  ]);

  const getQueryFields = () => {
    const queryFields: QueryFields = {
      ...(selectedStatus !== "ALL" && { status: selectedStatus }),
      ...(selectedMethod !== "ALL" && { method: selectedMethod }),
      ...(selectedProcessor !== "ALL" && { processor: selectedProcessor }),
      ...(selectedCurrency !== "ALL" && { currencyCode: selectedCurrency }),
      // status: selectedStatus !== "ALL" ? selectedStatus : undefined,
      // method: selectedMethod !== "ALL" ? selectedMethod : undefined,
      // processor: selectedProcessor !== "ALL" ? selectedProcessor : undefined,
      // currencyCode: selectedCurrency !== "ALL" ? selectedCurrency : undefined,
      // orderId: undefined,
    };
    if (searchQuery.length > 0) {
      queryFields.orderId = searchQuery;
    }
    return queryFields;
  };

  const getFilteredData = () => {
    console.log("filteredData");
    const filterPayload = getQueryFields();
    console.log("payments");
    console.log(payments);
    console.log(filterPayload);
    const filteredData = payments.filter((item) => {
      for (let key in filterPayload) {
        // console.log("key");
        // console.log(key);
        console.log(item[key]);
        console.log(filterPayload[key]);
        // console.log(filterPayload[key] !== method);
        // console.log(
        //
        // );
        // console.log(item[key]);
        if (key === "method") {
          const method =
            item?.paymentInstrument?.paymentInstrumentData?.binData?.network;
          const isMotMethod = filterPayload[key] !== method;
          if (isMotMethod) {
            return false;
          }
        } else if (key !== "method" && item[key] === undefined) {
          // console.log("und");
          // console.log(key);
          // console.log(item);
          return false;
        } else if (
          key === "orderId" &&
          !item[key].toLowerCase().includes(filterPayload[key].toLowerCase())
        ) {
          console.log("ord");
          return false;
        } else if (
          !["method", "orderId"].includes(key) &&
          filterPayload[key] !== item[key]
        ) {
          console.log("sel");
          return false;
        }
        // return true;
      }
      console.log("here");
      return true;
    });
    console.log(filteredData);
    // if (filteredData.length) {
    updatePayments(filteredData);
    // }
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      getFilteredData();
    }, 1000),
    [searchQuery] // will be created only once initially
  );

  useEffect(() => {
    if (payments.length) {
      debouncedSearch();
    }
    return debouncedSearch.cancel;
  }, [searchQuery, debouncedSearch]);

  return (
    <Wrapper>
      <Container>
        <SearchInput
          onChange={onSearchChange}
          placeholder="Search by your orderId"
        />
        <Dropdown
          options={processors}
          title="Processor"
          onChange={onProcessorChange}
        />
        <Dropdown
          options={paymentMethods}
          title="Payment method"
          onChange={onMethodChange}
        />
        <Dropdown
          options={transactionStatuses}
          title="Current status"
          onChange={onStatusChange}
        />
        <Dropdown
          options={transactionCurrencies}
          title="Currency"
          onChange={onCurrencyChange}
        />
      </Container>
    </Wrapper>
  );
};

export default TransactionFilter;
