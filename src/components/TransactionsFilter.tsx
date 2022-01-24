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
import { getAllPayments } from "../app/paymentAPI";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  padding: 10px;
  display: inline-flex;
  align-items: center;
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
`;

type QueryFields = {
  status?: string;
  method?: string;
  processor?: string;
  currencyCode?: string;
  orderId?: string;
};

const TransactionFilter = ({
  payments,
  updatePayments,
  updateLoadingStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("ALL");
  const [selectedProcessor, setSelectedProcessor] = useState("ALL");
  const [selectedCurrency, setSelectedCurrency] = useState("ALL");
  const [filtering, setFiltering] = useState(false);

  const onMethodChange = (value: string) => {
    setFiltering(true);
    setSelectedMethod(value);
  };

  const onProcessorChange = (value: string) => {
    setFiltering(true);
    setSelectedProcessor(value);
  };

  const onCurrencyChange = (value: string) => {
    setFiltering(true);
    setSelectedCurrency(value);
  };

  const onStatusChange = (value: string) => {
    setFiltering(true);
    setSelectedStatus(value);
  };

  const onSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    console.log("ffff");
    console.log(filtering);
    if (payments.length && filtering) {
      getFilteredData();
    }
  }, [
    selectedMethod,
    selectedProcessor,
    selectedStatus,
    selectedCurrency,
    payments,
    filtering,
  ]);

  const getQueryFields = () => {
    const queryFields: QueryFields = {
      ...(selectedStatus !== "ALL" && { status: selectedStatus }),
      ...(selectedProcessor !== "ALL" && { processor: selectedProcessor }),
      ...(selectedCurrency !== "ALL" && { currency_code: selectedCurrency }),
    };
    return new URLSearchParams(queryFields).toString();
  };

  const getOtherQueryParams = () => {
    // filters not supported by api
    const queryParams: QueryFields = {
      ...(selectedMethod !== "ALL" && { method: selectedMethod }),
    };
    if (searchQuery.length > 0) {
      queryParams.orderId = searchQuery;
    }
    return queryParams;
  };

  const getFilteredData = async () => {
    updateLoadingStatus(true);

    let queryString = getQueryFields();

    queryString = queryString ? "?" + queryString : "";

    const { data: newPaymentData } = await getAllPayments({ queryString });
    const otherQueryParams = getOtherQueryParams();
    const filteredData = newPaymentData.filter((item) => {
      for (const key in otherQueryParams) {
        if (key === "method") {
          const method =
            item?.paymentInstrument?.paymentInstrumentData?.binData?.network;
          const isNotMethod = otherQueryParams[key] !== method;
          if (isNotMethod) {
            return false;
          }
        } else if (
          key === "orderId" &&
          !item[key].toLowerCase().includes(otherQueryParams[key].toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
    updatePayments(filteredData);
    updateLoadingStatus(false);
    setFiltering(false);
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      setFiltering(true);
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
