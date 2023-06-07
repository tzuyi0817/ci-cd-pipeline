'use client';

import { useState, useEffect } from 'react';
import VirtualizedList from '@/components/VirtualizedList';

const ITEM_COUNT = 1000;

interface Item {
  index: number;
  name: string;
}

function List() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const list = Array(ITEM_COUNT)
      .fill('')
      .map((_, index) => ({ index, name: `item ${index}` }));
    
    setItems(list);
  }, []);

  return (
    <VirtualizedList
      itemHeight={40}
      windowHeight={window.innerHeight}
      itemCount={items.length}
      renderItem={({ index, style }) => {
        const element = items[index];

        return (
          <div key={element.name} style={style}>
            <p className="text-center">{element.name}</p>
          </div>
        )
      }}
    />
  )
}

export default List;
