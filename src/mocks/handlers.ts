import { http, HttpResponse } from 'msw';

interface IDocument {
  position: string;
  type: string;
  title: string;
}

// get documents
let documents: Array<IDocument> = [
  { position: '1', type: 'bank-draft', title: 'Bank Draft' },
  { position: '2', type: 'bill-of-lading', title: 'Bill of Lading' },
  { position: '3', type: 'invoice', title: 'Invoice' },
  { position: '4', type: 'bank-draft-2', title: 'Bank Draft 2' },
  { position: '5', type: 'bill-of-lading-2', title: 'Bill of Lading 2' },
];

const getDocuments = http.get('/documents', () => {
  // ...and respond to them using this JSON response.
  return HttpResponse.json(documents);
});

// create document

type CreateDocumentParams = never;
type CreateDocumentRequestBody = IDocument;
type CreateDocumentResponseBody = IDocument | Response;

const createDocument = http.post<
  CreateDocumentParams,
  CreateDocumentRequestBody,
  CreateDocumentResponseBody
>('/documents', async ({ request }) => {
  const newDocument = await request.json();
  documents.push(newDocument);
  return HttpResponse.json<IDocument>(newDocument);
});

// update the order of documents
type UpdateDocumentOrderParams = never;
type UpdateDocumentOrderResponseBody = Array<IDocument>;
type UpdateDocumentOrderRequestBody = Array<IDocument>;

const updateDocumentOrder = http.put<
  UpdateDocumentOrderParams,
  UpdateDocumentOrderRequestBody,
  UpdateDocumentOrderResponseBody
>('/documents/reorder', async ({ request }) => {
  const reorderedDocuments = await request.json();
  documents = reorderedDocuments;
  return HttpResponse.json(documents);
});

// handlers

export const handlers = [getDocuments, createDocument, updateDocumentOrder];
