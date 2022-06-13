/* eslint-disable react/require-default-props */
import React, { Fragment, useRef } from 'react';
import { Anime } from 'components/Interfaces';
import styles from 'styles/MiniCardRow.module.scss';
import MiniCard from './MiniCard';
import ViewMoreButton from 'components/Buttons/ViewMoreButton';
import useToggle from 'hooks/useToggle';
import useIsOverflow from 'hooks/useIsOverflow';

interface Data {
  node: Anime, relation_type_formatted?: string, num_recommendations?: number,
}

interface Props {
  animeData: Data[],
  title: string,
}

const MiniCardRow = ({ animeData = [], title }: Props) => {
  const animeDataSlice = animeData;
  const [showMore, setShowMore] = useToggle();
  const overflowRef = useRef<HTMLHeadingElement>(null);
  const isOverflow = useIsOverflow(overflowRef, true, undefined);
  return (
    <div className={styles.recommendationContainer}>
      {
        animeData.length > 0
        && (
        <>
          <div className={styles.titleContainer}>
            <h3>{title}</h3>
            {
              isOverflow
              && (
                <ViewMoreButton text='show' setViewMore={setShowMore} viewMore={showMore}/>
              )
            }
          </div>
          <div ref={overflowRef} className={`${styles.recommendationGrid} ${showMore && styles.showMore}`}>
            {
              animeDataSlice.map(({ node, num_recommendations, relation_type_formatted }, i) => (
                <Fragment key={node.id}
                >
                  <MiniCard
                    data={node}
                    num_recommendations={num_recommendations}
                    relation_type_formatted={relation_type_formatted}
                    i={i}
                  />
                </Fragment>
              ))
            }
          </div>
        </>
        )
      }
    </div>
  );
};

export default MiniCardRow;
