import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { getAllPayments } from "../../app/paymentAPI";
import { Wrapper, Container, SearchInput } from "./style";
import Dropdown from "../Dropdown";
import {
  paymentMethods,
  processors,
  transactionCurrencies,
  transactionStatuses,
} from "../../utils";

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

    let newPaymentData = [...payments];
    if (queryString.length > 0) {
      queryString = "?" + queryString;
      const { data } = await getAllPayments({ queryString });
      newPaymentData = data;
    }
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
