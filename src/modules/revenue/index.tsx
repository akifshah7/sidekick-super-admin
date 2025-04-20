

// import React from 'react'

// const Revenue: React.FC = () => {
//   return (
//     <div>Revenue</div>
//   )
// }

// export default Revenue

import React, { useState} from "react";
import ModalStore from "@/globalStore/modalStore";
// import AddCreditsModal from "./components/AddCreditsModal";
// import TransactionTable from "./components/TransactionHistoryTable";
import AssignCreditsModal from "./components/AssignCreditModal";
import Table1 from "./components/table1.tsx";
import Table2 from "./components/table2.tsx";


const Revenue: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"This Month" | "Last Month">("This Month");
  const { openModal } = ModalStore();

  // const {
  //   data: walletData,
  //   error: walletError,
  //   loading: walletLoading,
  // } = useQuery(FETCH_WALLET_BALANCE, {
  //   variables: {
  //     _eq: "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0"
  //   }
  // });

  // // Memoize the variables so they only change when activeTab changes
  // const dateVariables = useMemo(() => getDatesForActiveTab(activeTab), [activeTab]);

  // const {
  //   data: transactionData,
  //   error: transactionError,
  //   loading: transactionLoading,
  // } = useQuery(FETCH_WALLET_TRANSACTIONS, {
  //   variables: dateVariables,
  //   fetchPolicy: 'network-only'
  // });

  // if (walletLoading || transactionLoading) return <p>Loading...</p>;
  // if (walletError || transactionError) return <p>Error loading data!</p>;

  return (
    <div className="flex flex-col gap-y-4">
      <div className='gap-y-4 bg-card-background w-full px-2 py-4 flex flex-col rounded-md h-40 shadow-sm justify-center items-center'>
        <h2 className='font-bold text-xl leading-[100%] tracking-[0%] font-plus-jakart'>Revenue this Month</h2>
        <h1 className='font-[Plus Jakarta Sans] font-bold text-[34px] leading-[100%] tracking-[0%]'>XXXX</h1>
      </div>
      <div className="flex justify-end gap-x-2">
        {/* <button
          // onClick={() => openModal(() => <AddCreditsModal currentBalance={walletData.wallets[0].balance} walletId={walletData.wallets[0].id} />)}
          className="bg-btn-secondary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          Add Credits
        </button> */}
        <button
          onClick={() => openModal(AssignCreditsModal)}
          className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          Assign Credits
        </button>
      </div>
      <div className="max-h-fit overflow-auto">
        <h2 className="font-semibold text-lg">Revenue</h2>
        <div className="flex gap-x-2 mt-2">
          {/* This Month Tab */}
          <button
            onClick={() => setActiveTab("This Month")}
            className={`px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer ${activeTab === "This Month"
              ? "bg-tabs-primary text-black"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            This Month
          </button>
          {/* Last Month Tab */}
          <button
            onClick={() => setActiveTab("Last Month")}
            className={`px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer ${activeTab === "Last Month"
              ? "bg-tabs-primary text-black"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            Last Month
          </button>
        </div>
        <div className="w-full mt-2">
          {/* Pass the transactions to your TransactionTable component */}
          {/* <TransactionTable transactions={transactionData.wallet_transactions} /> */}
          <Table1 />
        </div>
        <div className="flex w-full justify-end mt-2">
          <button className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full">
            Export
          </button>
        </div>
      </div>

      <div className="max-h-fit overflow-auto">
        <h2 className="font-semibold text-lg">Transaction History</h2>
        <div className="flex gap-x-2 mt-2">
          {/* This Month Tab */}
          <button
            onClick={() => setActiveTab("This Month")}
            className={`px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer ${activeTab === "This Month"
              ? "bg-tabs-primary text-black"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            This Month
          </button>
          {/* Last Month Tab */}
          <button
            onClick={() => setActiveTab("Last Month")}
            className={`px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer ${activeTab === "Last Month"
              ? "bg-tabs-primary text-black"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            Last Month
          </button>
        </div>
        <div className="w-full mt-2">
          {/* Pass the transactions to your TransactionTable component */}
          {/* <TransactionTable transactions={transactionData.wallet_transactions} /> */}
          <Table2 />
        </div>




        <div className="flex w-full justify-end mt-2">
          <button className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full">
            Export
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Revenue;