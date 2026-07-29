import { CourtDocumentCase } from '../types';

export interface RecentCourtDocument {
  id: string;
  savedAt: string;
  sourceName: string;
  pageCount?: number;
  courtCase: CourtDocumentCase;
}

const DATABASE_NAME = 'nyayvaani-local';
const DATABASE_VERSION = 1;
const STORE_NAME = 'recentDocuments';
const MAX_RECENT_DOCUMENTS = 8;

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const getRecentDocuments = async (): Promise<RecentCourtDocument[]> => {
  if (typeof indexedDB === 'undefined') return [];
  const database = await openDatabase();
  try {
    const documents = await new Promise<RecentCourtDocument[]>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readonly');
      const request = transaction.objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve(request.result as RecentCourtDocument[]);
      request.onerror = () => reject(request.error);
    });
    return documents.sort(
      (left, right) =>
        new Date(right.savedAt).getTime() - new Date(left.savedAt).getTime(),
    );
  } finally {
    database.close();
  }
};

export const deleteRecentDocument = async (id: string): Promise<void> => {
  if (typeof indexedDB === 'undefined') return;
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
};

export const saveRecentDocument = async (
  document: RecentCourtDocument,
): Promise<void> => {
  if (typeof indexedDB === 'undefined') return;
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(document);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }

  const documents = await getRecentDocuments();
  await Promise.all(
    documents
      .slice(MAX_RECENT_DOCUMENTS)
      .map((savedDocument) => deleteRecentDocument(savedDocument.id)),
  );
};
