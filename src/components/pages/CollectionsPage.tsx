'use client';

import { SuccessfulConstantsResponse } from '@/lib/types';
import { useCollectionsStore } from '@/providers/CollectionsStoreProvider';
import { useCallback, useEffect } from 'react';

export default function CollectionsPage() {
  const {
    constantsCurrentPage,
    constantsTotalPages,
    constantItems,
    addConstantsPage,
    setIsFetchingConstants,
    setConstantsCurrentPage,
    setConstantsTotalPages,
  } = useCollectionsStore(state => state);
  const addToConstantsFn = async (page: number) => {
    if (page !== 1 && page > constantsTotalPages) {
      return;
    }

    setConstantsCurrentPage(page);
    if (constantItems.find(item => item.meta.page !== page) !== undefined) {
      return;
    }

    setIsFetchingConstants(true);
    const response = await fetch('/api/constants?page=' + page);
    if (!response.ok) {
      setIsFetchingConstants(false);
      return;
    }

    const result: SuccessfulConstantsResponse = await response.json();

    setConstantsTotalPages(result.meta.totalPages);
    addConstantsPage({ meta: result.meta, data: result.data });
    setIsFetchingConstants(false);
  };
  const addToConstants = useCallback(
    async (page: number) => await addToConstantsFn(page),
    [constantItems.length]
  );

  useEffect(() => {
    if (constantsCurrentPage === 0) {
      addToConstants(1);
    }
  }, []);

  return <></>;
}
