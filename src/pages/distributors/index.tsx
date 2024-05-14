import { useAuth } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import type { DFilterCriteria, FilterOption } from "~/types";
import PageContent from "~/components/common/PageContent";
import { List } from "~/components/common/List";
import DistributorHeader from "~/components/distributors/DistributorHeader";
import DistributorItem from "~/components/distributors/DistributorItem";
import DistributorModal from "~/components/distributors/DistributorModal";

type Distributor = RouterOutputs["distributor"]["getAll"][number];

const DistributorsPage = () => {
  const { userId } = useAuth();
  const activeId = userId as string;

  const { data } = api.distributor.getAll.useQuery({ userId: activeId });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [filterCriteria, setFilterCriteria] = useState<DFilterCriteria>({
    allInvoicesPaid: undefined,
    name: undefined,
  });

  const handleNewDistributorClick = () => setModalOpen(true);

  const pendingDistributorsCount = data?.filter(
    (distributor) => distributor.allInvoicesPaid === false,
  ).length;

  const handleFilterChange = (newCriteria: DFilterCriteria) => {
    setFilterCriteria(newCriteria);
  };

  const allInvoicesPaid: FilterOption[] = [
    { value: "true", label: "Paid" },
    { value: "false", label: "Unpaid" },
  ];

  const filteredDistributors = useMemo(() => {
    return (
      data?.filter((distributor) => {
        const matchesName = filterCriteria.name
          ? distributor.name
              .toLowerCase()
              .includes(filterCriteria.name.toLowerCase())
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
    <PageContent>
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
            id={distributor.id}
            name={distributor.name}
            distributorEmail={distributor.email}
            amountDue={distributor.totalUnpaidInvoicesAmount}
            allInvoicesPaid={distributor.allInvoicesPaid}
          />
        )}
      />
      <DistributorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </PageContent>
  );
};

export default DistributorsPage;
