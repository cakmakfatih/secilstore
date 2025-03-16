'use client';

import { Collection, CollectionResponse } from '@/lib/types';
import { useCollectionsStore } from '@/providers/CollectionsStoreProvider';
import { useCallback, useEffect } from 'react';

const ListItem = ({ item }: { item: Collection }) => {
  return (
    <div className="flex border-b border-color-form py-3">
      <span className="flex-1 text-center">Koleksiyon {item.id}</span>
      <div className="flex-1 text-center items-stretch flex flex-col">
        {item.filters.filters.map((i, idx) => (
          <span key={idx}>
            Ürün {i.title} Bilgisi Şuna Eşit: {i.valueName ?? i.value}{' '}
          </span>
        ))}
      </div>
      <span className="flex-1 text-center">{item.salesChannelId}</span>
      <div className="flex-1 text-center flex justify-center align-center">
        <button className="border border-gray-200 rounded-sm self-center h-[40px] px-4">
          Sabitleri Düzenle
        </button>
      </div>
    </div>
  );
};

export default function CollectionsPage() {
  const {
    isFetchingConstants,
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
    const response = await fetch('/api/constants?page=' + page, {
      cache: 'no-store',
      headers: {
        Pragma: 'no-cache',
      },
    });
    if (!response.ok) {
      setIsFetchingConstants(false);
      return;
    }

    const result: CollectionResponse = await response.json();

    setConstantsTotalPages(result.meta.totalPages);
    addConstantsPage({ meta: result.meta, data: result.data });
    setIsFetchingConstants(false);
  };

  const addToConstants = useCallback((page: number) => addToConstantsFn(page), [addToConstantsFn]);
  const currentItems: Collection[] =
    constantItems.find(i => i.meta.page === constantsCurrentPage)?.data ?? [];

  useEffect(() => {
    if (constantsCurrentPage === 0) {
      addToConstants(1);
    }
  }, []);

  return (
    <>
      <div className="font-bold flex border-b border-black py-6 mx-4">
        <span className="flex-1 text-center">Başlık</span>
        <span className="flex-1 text-center">Ürün Koşulları</span>
        <span className="flex-1 text-center">Satış Kanalı</span>
        <span className="flex-1 text-center">İşlemler</span>
      </div>
      <div className="flex flex-1 flex-col items-stretch mx-4 overflow-y-auto min-h-0">
        {isFetchingConstants ? (
          <div className="self-center">Loading</div>
        ) : (
          currentItems.map((i, idx) => <ListItem item={i} key={idx} />)
        )}
      </div>
    </>
  );
}
