import fetch from "isomorphic-fetch";
import { setupServer } from "msw/node";
import {
  ApprovalStatus,
  mockInvoiceApprovalsContainerApproversQuery,
} from "./generated/defs";
import { INVOICE_APPROVALS_QUERY } from "./my-queries";

const serverSpy = jest.fn((invoiceId: string) => {});

const server = setupServer(
  mockInvoiceApprovalsContainerApproversQuery((req, res, ctx) => {
    const { invoiceId } = req.variables;
    serverSpy(invoiceId);
    return res(
      ctx.data({
        invoice: {
          __typename: "Invoice",
          id: invoiceId,
          requiresLedgerSync: false,
          approvers: [
            {
              __typename: "Approver",
              firstName: "",
              lastName: "",
              userId: "",
              status: ApprovalStatus.Approved,
            },
          ],
        },
      })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe("msw test", () => {
  describe("when calling a graphql endpoint", () => {
    const invoiceId = "12345";
    let res: Response;
    let json: any;
    beforeAll(async () => {
      res = await fetch("http://localhost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: INVOICE_APPROVALS_QUERY,
          variables: { invoiceId: invoiceId, unvoiceId: invoiceId },
        }),
      });
      json = await res.json();
    });
    it("returns the invoice id", () => {
      expect(json.data.invoice.id).toBe(invoiceId);
    });
    it("triggers the server handler", () => {
      expect(serverSpy).toBeCalledWith(invoiceId);
    });
  });
});
