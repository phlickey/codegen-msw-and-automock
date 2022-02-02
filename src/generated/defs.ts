import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Time: any;
};

export type AccountRef = {
  __typename?: 'AccountRef';
  accountId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type AmortizationSchedule = {
  __typename?: 'AmortizationSchedule';
  cancelledAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  creditAccount: GlAccount;
  creditAccountId: Scalars['ID'];
  defaultDebitAccount: GlAccount;
  defaultDebitAccountId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  endDate: Scalars['Date'];
  generalLedger: GeneralLedger;
  generalLedgerId: Scalars['ID'];
  id: Scalars['ID'];
  invoice: Invoice;
  invoiceId: Scalars['ID'];
  journalEntries: Array<JournalEntry>;
  lastUpdatedAt: Scalars['DateTime'];
  startDate: Scalars['Date'];
  status: AmortizationScheduleStatus;
};

export enum AmortizationScheduleStatus {
  ScheduleCancelled = 'SCHEDULE_CANCELLED',
  ScheduleCompleted = 'SCHEDULE_COMPLETED',
  ScheduleDraft = 'SCHEDULE_DRAFT',
  ScheduleInProgress = 'SCHEDULE_IN_PROGRESS'
}

export type Amount = {
  __typename?: 'Amount';
  amountOriginal: Scalars['Float'];
  amountUSD: Scalars['Float'];
  currency: Currency;
};

export enum ApprovalStatus {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING',
  Unassigned = 'UNASSIGNED'
}

export type Approver = {
  __typename?: 'Approver';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  status: ApprovalStatus;
  userId: Scalars['ID'];
};

export type Bill = {
  __typename?: 'Bill';
  amortizationSchedule?: Maybe<AmortizationSchedule>;
  billDate: Scalars['Date'];
  billLineItems: Array<BillLineItem>;
  currency?: Maybe<Scalars['String']>;
  generalLedger?: Maybe<GeneralLedger>;
  generalLedgerId?: Maybe<Scalars['ID']>;
  glSupplier?: Maybe<GlSupplier>;
  glSupplierId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  referenceNumber?: Maybe<Scalars['String']>;
  syncedToLedgerAt?: Maybe<Scalars['DateTime']>;
  totalAmount: Amount;
  updatedInternallyAt: Scalars['DateTime'];
};

export type BillLineItem = {
  __typename?: 'BillLineItem';
  accountRef?: Maybe<AccountRef>;
  description: Scalars['String'];
  glAccount?: Maybe<GlAccount>;
  glAccountId?: Maybe<Scalars['ID']>;
  glClass?: Maybe<GlClass>;
  glClassId?: Maybe<Scalars['ID']>;
  glLocation?: Maybe<GlLocation>;
  glLocationId?: Maybe<Scalars['ID']>;
  quantity: Scalars['Float'];
  taxRateRef?: Maybe<TaxRateReference>;
  totalAmount: Scalars['Float'];
  unitAmount: Scalars['Float'];
};

export type CheckDetailsAddress = {
  city: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  line: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['String'];
};

export type CheckDetailsInput = {
  memo: Scalars['String'];
  recipientAddress: CheckDetailsAddress;
  recipientName: Scalars['String'];
};

export enum Currency {
  Eur = 'EUR',
  Usd = 'USD'
}

export enum DenyReason {
  DissatisfiedWithService = 'DISSATISFIED_WITH_SERVICE',
  DuplicateBill = 'DUPLICATE_BILL',
  IncorrectBillDetails = 'INCORRECT_BILL_DETAILS',
  InvalidBill = 'INVALID_BILL',
  NotABill = 'NOT_A_BILL',
  Other = 'OTHER'
}

export enum DuplicateStatusEnum {
  Duplicate = 'DUPLICATE',
  Invoice = 'INVOICE',
  Replacement = 'REPLACEMENT'
}

export type GlAccount = {
  __typename?: 'GLAccount';
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type GlClass = {
  __typename?: 'GLClass';
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type GlLocation = {
  __typename?: 'GLLocation';
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type GlSupplier = {
  __typename?: 'GLSupplier';
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type GeneralLedger = {
  __typename?: 'GeneralLedger';
  accounts: Array<GlAccount>;
  authRedirectUrl?: Maybe<Scalars['String']>;
  classes: Array<GlClass>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  lastDataSync?: Maybe<Scalars['Date']>;
  ledgerLockDate?: Maybe<Scalars['DateTime']>;
  ledgerStatus?: Maybe<Scalars['String']>;
  locations: Array<GlLocation>;
  platformKey: PlatformKey;
  platformName: Scalars['String'];
  suppliers: Array<GlSupplier>;
  topLevelClassId?: Maybe<Scalars['String']>;
  topLevelLocationId?: Maybe<Scalars['String']>;
  topLevelTrackingCategoryRefs?: Maybe<Array<TrackingCategoryReference>>;
};

export type Invoice = {
  __typename?: 'Invoice';
  amountDue: Amount;
  approvers: Array<Approver>;
  bill?: Maybe<Bill>;
  billingFrequency?: Maybe<InvoiceBillingFrequency>;
  commentsCount: Scalars['Int'];
  denialReason?: Maybe<Scalars['String']>;
  denialReasonNotes?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  fileURL: Scalars['String'];
  hasUnsyncedBill: Scalars['Boolean'];
  id: Scalars['ID'];
  invoiceDate?: Maybe<Scalars['Date']>;
  isDuplicate: Scalars['Boolean'];
  number: Scalars['String'];
  periodEndDate?: Maybe<Scalars['Date']>;
  periodStartDate?: Maybe<Scalars['Date']>;
  primaryDuplicateId?: Maybe<Scalars['ID']>;
  primaryDuplicateInvoiceNumber?: Maybe<Scalars['String']>;
  requiresLedgerSync?: Maybe<Scalars['Boolean']>;
  sentAt?: Maybe<Scalars['Date']>;
  totalAmount: Amount;
};


export type InvoiceBillArgs = {
  waitForBill: Scalars['Boolean'];
};

export enum InvoiceBillingFrequency {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY',
  Other = 'OTHER',
  Quarterly = 'QUARTERLY'
}

export enum InvoicePaymentRequestStatus {
  Failed = 'FAILED',
  Succeeded = 'SUCCEEDED'
}

export enum InvoiceProcessingStatusEnum {
  HeaderCompleted = 'HEADER_COMPLETED',
  LineItemsCompleted = 'LINE_ITEMS_COMPLETED',
  LineItemsInProgress = 'LINE_ITEMS_IN_PROGRESS'
}

export type JournalEntry = {
  __typename?: 'JournalEntry';
  amount: Amount;
  creditAccount: GlAccount;
  creditAccountId: Scalars['ID'];
  date: Scalars['Date'];
  debitAccount: GlAccount;
  debitAccountId: Scalars['ID'];
  generalLedger: GeneralLedger;
  generalLedgerId: Scalars['ID'];
  id?: Maybe<Scalars['ID']>;
  status: JournalEntryStatus;
};

export enum JournalEntryStatus {
  JournalEntryCompleted = 'JOURNAL_ENTRY_COMPLETED',
  JournalEntryScheduled = 'JOURNAL_ENTRY_SCHEDULED'
}

export type PayInvoiceRequestResponse = {
  __typename?: 'PayInvoiceRequestResponse';
  invoice: Invoice;
  status: InvoicePaymentRequestStatus;
};

export enum PaymentStatus {
  Failed = 'FAILED',
  InFlight = 'IN_FLIGHT',
  MarkedAsPaid = 'MARKED_AS_PAID',
  NotPaid = 'NOT_PAID',
  Paid = 'PAID',
  Pending = 'PENDING',
  ReadyToPay = 'READY_TO_PAY',
  Scheduled = 'SCHEDULED'
}

export type Platform = {
  __typename?: 'Platform';
  displayName: Scalars['String'];
  key: PlatformKey;
  logoUrl: Scalars['String'];
};

export enum PlatformKey {
  NetsuiteInternal = 'netsuite_internal',
  Quickbooksonline = 'quickbooksonline',
  Sandbox = 'sandbox',
  Xero = 'xero'
}

export type Query = {
  __typename?: 'Query';
  invoice?: Maybe<Invoice>;
  invoices: Array<Invoice>;
};


export type QueryInvoiceArgs = {
  id: Scalars['ID'];
};


export type QueryInvoicesArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type TaggableUser = {
  __typename?: 'TaggableUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  initials: Scalars['String'];
  isEligible: Scalars['Boolean'];
  lastName: Scalars['String'];
  name: Scalars['String'];
};

export type TaxRateReference = {
  __typename?: 'TaxRateReference';
  name?: Maybe<Scalars['String']>;
  taxRateId: Scalars['String'];
};

export type TrackingCategoryReference = {
  __typename?: 'TrackingCategoryReference';
  name?: Maybe<Scalars['String']>;
  trackingCategoryId: Scalars['String'];
};

export type UpdateInvoiceApprovalInput = {
  approvalStatus: ApprovalStatus;
  notes?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<DenyReason>;
};

export type UpdateInvoiceApproversInput = {
  approverIds: Array<Scalars['ID']>;
};

export type UpdateInvoiceInput = {
  amountDue?: InputMaybe<Scalars['Float']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  invoiceDate?: InputMaybe<Scalars['Date']>;
  number?: InputMaybe<Scalars['String']>;
  periodEndDate?: InputMaybe<Scalars['Date']>;
  periodStartDate?: InputMaybe<Scalars['Date']>;
  totalAmount?: InputMaybe<Scalars['Float']>;
};

export type InvoiceApprovalsApproversFragmentFragment = { __typename?: 'Invoice', id: string, requiresLedgerSync?: boolean | null, denialReason?: string | null, denialReasonNotes?: string | null, approvers: Array<{ __typename?: 'Approver', userId: string, firstName: string, lastName: string, status: ApprovalStatus }> };

export type InvoiceApprovalsContainerApproversQueryVariables = Exact<{
  invoiceId: Scalars['ID'];
}>;


export type InvoiceApprovalsContainerApproversQuery = { __typename?: 'Query', invoice?: { __typename?: 'Invoice', id: string, requiresLedgerSync?: boolean | null, denialReason?: string | null, denialReasonNotes?: string | null, approvers: Array<{ __typename?: 'Approver', userId: string, firstName: string, lastName: string, status: ApprovalStatus }> } | null };

export type InvoiceApprovalsBillFragmentFragment = { __typename?: 'Invoice', id: string, bill?: { __typename?: 'Bill', id: string, currency?: string | null, generalLedgerId?: string | null, glSupplierId?: string | null, billLineItems: Array<{ __typename?: 'BillLineItem', glAccountId?: string | null }> } | null };

export type InvoiceApprovalsContainerBillQueryVariables = Exact<{
  invoiceId: Scalars['ID'];
  waitForBill: Scalars['Boolean'];
}>;


export type InvoiceApprovalsContainerBillQuery = { __typename?: 'Query', invoice?: { __typename?: 'Invoice', id: string, bill?: { __typename?: 'Bill', id: string, currency?: string | null, generalLedgerId?: string | null, glSupplierId?: string | null, billLineItems: Array<{ __typename?: 'BillLineItem', glAccountId?: string | null }> } | null } | null };


/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInvoiceApprovalsContainerApproversQuery((req, res, ctx) => {
 *   const { invoiceId } = req.variables;
 *   return res(
 *     ctx.data({ invoice })
 *   )
 * })
 */
export const mockInvoiceApprovalsContainerApproversQuery = (resolver: ResponseResolver<GraphQLRequest<InvoiceApprovalsContainerApproversQueryVariables>, GraphQLContext<InvoiceApprovalsContainerApproversQuery>, any>) =>
  graphql.query<InvoiceApprovalsContainerApproversQuery, InvoiceApprovalsContainerApproversQueryVariables>(
    'InvoiceApprovalsContainerApprovers',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInvoiceApprovalsContainerBillQuery((req, res, ctx) => {
 *   const { invoiceId, waitForBill } = req.variables;
 *   return res(
 *     ctx.data({ invoice })
 *   )
 * })
 */
export const mockInvoiceApprovalsContainerBillQuery = (resolver: ResponseResolver<GraphQLRequest<InvoiceApprovalsContainerBillQueryVariables>, GraphQLContext<InvoiceApprovalsContainerBillQuery>, any>) =>
  graphql.query<InvoiceApprovalsContainerBillQuery, InvoiceApprovalsContainerBillQueryVariables>(
    'InvoiceApprovalsContainerBill',
    resolver
  )
