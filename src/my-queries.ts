const gql = (strs: TemplateStringsArray) => strs.join();

export const INVOICE_APPROVALS_QUERY = gql`
  fragment InvoiceApprovalsApproversFragment on Invoice {
    id
    requiresLedgerSync
    denialReason
    denialReasonNotes
    approvers {
      userId
      firstName
      lastName
      status
    }
  }
  query InvoiceApprovalsContainerApprovers($invoiceId: ID!) {
    invoice(id: $invoiceId) {
      ...InvoiceApprovalsApproversFragment
    }
  }
`;

export const INVOICE_BILLS_QUERY = gql`
  fragment InvoiceApprovalsBillFragment on Invoice {
    id
    bill(waitForBill: $waitForBill) {
      id
      currency
      generalLedgerId
      glSupplierId
      billLineItems {
        glAccountId
      }
    }
  }

  query InvoiceApprovalsContainerBill($invoiceId: ID!, $waitForBill: Boolean!) {
    invoice(id: $invoiceId) {
      ...InvoiceApprovalsBillFragment
    }
  }
`;
