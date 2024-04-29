import { useState, useMemo } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import type { FilterCriteria, FilterOption } from "~/types";
import MainContent from "~/components/common/MainContent";
import { List } from "~/components/common/List";
import DistributorHeader from "~/components/distributors/DistributorHeader";
import DistributorItem from "~/components/distributors/DistributorItem";
import DistributorModal from "~/components/distributors/DistributorModal";

type Distributor = RouterOutputs["distributor"]["getAll"][number];

const DistributorsPage = () => {
  const { data } = api.distributor.getAll.useQuery();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleNewDistributorClick = () => setModalOpen(true);

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    allInvoicesPaid: undefined,
    distributorName: undefined,
  });

  const pendingDistributorsCount = data?.filter(
    (distributor) => distributor.allInvoicesPaid === false,
  ).length;

  const handleFilterChange = (newCriteria: FilterCriteria) => {
    setFilterCriteria(newCriteria);
  };

  const allInvoicesPaid: FilterOption[] = [
    { value: "true", label: "All invoices paid" },
    { value: "false", label: "Some invoices unpaid" },
  ];

  const filteredDistributors = useMemo(() => {
    return (
      data?.filter((distributor) => {
        const matchesName = filterCriteria.distributorName
          ? distributor.name
              .toLowerCase()
              .includes(filterCriteria.distributorName.toLowerCase())
          : true;
        const matchesAllInvoicesPaid =
          filterCriteria.allInvoicesPaid !== undefined
            ? distributor.allInvoicesPaid ===
              (filterCriteria.allInvoicesPaid === true)
            : true;

        return matchesName && matchesAllInvoicesPaid;
      }) || []
    );
  }, [data, filterCriteria]);

  return (
    <MainContent>
      <DistributorHeader
        pendingDistributorsCount={pendingDistributorsCount}
        onNewDistributorClick={handleNewDistributorClick}
        filterOptions={allInvoicesPaid}
        onFilterChange={handleFilterChange}
        filterCriteria={filterCriteria}
      />
      <List
        data={filteredDistributors}
        renderItem={(distributor: Distributor) => (
          <DistributorItem
            key={distributor.id}
            distributorName={distributor.name}
            distributorEmail={distributor.email}
            amountDue={distributor.totalUnpaidInvoicesAmount}
            allInvoicesPaid={distributor.allInvoicesPaid}
            routeName={distributor.id}
          />
        )}
      />
      <DistributorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </MainContent>
  );
};

export default DistributorsPage;
