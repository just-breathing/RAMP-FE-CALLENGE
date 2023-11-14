import { useCallback,useRef,useEffect } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithoutCache, loading } = useCustomFetch()
  const scrollViewRef=useRef(null);

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })
    },
    [fetchWithoutCache]
  )
  useEffect(()=>{
    if(scrollViewRef.current!)
    {
     console.log(scrollViewRef.current);
     if (scrollViewRef.current) {
      // Type assertion to inform TypeScript that scrollViewRef.current is not null
      const element = scrollViewRef.current as HTMLDivElement;

      element.scroll({ top: 450});

      setTimeout(()=>{
        element.scroll({ top: 0, behavior: 'smooth' });

      },60)

    }  

    }
  },[transactions])

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container"ref={scrollViewRef} >
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}
