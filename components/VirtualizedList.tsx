'use client';

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  type CSSProperties,
  type ReactElement,
  type UIEvent,
} from 'react';

interface RenderCallbackParams {
  index: number;
  style: CSSProperties;
}

interface Props {
  itemHeight: number;
  windowHeight: number;
  itemCount: number;
  renderItem: (params: RenderCallbackParams) => ReactElement;
}

function VirtualizedList({ 
  itemHeight,
  windowHeight,
  itemCount,
  renderItem,
}: Props) {
  const [scrollTop, setScrollTop] = useState(0);
  const [items, setItems] = useState<ReactElement[]>([]);
  const innerHeight = useMemo(() => {
    return itemCount * itemHeight;
  }, [itemCount, itemHeight]);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight),
  );

  useEffect(() => {
    const items = [];

    for (let index = startIndex; index <= endIndex; index++) {
      items.push(
        renderItem({
          index,
          style: {
            position: 'absolute',
            top: `${index * itemHeight}px`,
            width: '100%',
          },
        })
      );
    }
    setItems([...items]);
  }, [itemHeight, renderItem, startIndex, endIndex]);

  const handleScroll = useCallback((event: UIEvent<HTMLElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return (
    <div
      style={{ overflowY: 'scroll', height: `${windowHeight}px` }}
      onScroll={handleScroll}
    >
      <div style={{ position: 'relative', height: `${innerHeight}px` }}>
        {items}
      </div>
    </div>
  )
}

export default VirtualizedList;
