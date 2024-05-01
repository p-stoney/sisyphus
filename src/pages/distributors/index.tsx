import { useAuth } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import type { DFilterCriteria, FilterOption } from "~/types";
import MainContent from "~/components/common/MainContent";
import { List } from "~/components/common/List";
import DistributorHeader from "~/components/distributors/DistributorHeader";
import DistributorItem from "~/components/distributors/DistributorItem";
import DistributorModal from "~/components/distributors/DistributorModal";

type Distributor = RouterOutputs["distributor"]["getAll"][number];

const DistributorsPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [filterCriteria, setFilterCriteria] = useState<DFilterCriteria>({
    allInvoicesPaid: undefined,
    distributorName: undefined,
  });

  const { userId } = useAuth();

  const activeId = userId as string;

  const { data } = api.distributor.getAll.useQuery({ userId: activeId });

  const handleNewDistributorClick = () => setModalOpen(true);

  const pendingDistributorsCount = data?.filter(
    (distributor) => distributor.allInvoicesPaid === false,
  ).length;

  const handleFilterChange = (newCriteria: DFilterCriteria) => {
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { userId } = getAuth(ctx.req);
//   const { db } = ctx;

//   if (!userId) {
//     return {
//       redirect: {
//         destination: "/sign-in",
//         permanent: false,
//       },
//     };
//   }

//   const user = await db.user.findUnique({ where: { id: userId } });

//   return { props: { ...buildClerkProps(ctx.req), user } };
// };
