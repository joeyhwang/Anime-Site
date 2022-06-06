/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Anime } from 'components/Interfaces';
import styles from 'styles/MiniCardRow.module.scss';
import MiniCard from './MiniCard';

interface Data {
  node: Anime, relation_type_formatted?: string, num_recommendations?: number,
}

interface Props {
  animeData: Data[],
  title: string,
}

const MiniCardRow = ({ animeData = [], title }: Props) => {
  const [showMore, setShowMore] = useState(false);
  // const animeDataSlice = showMore ? animeData : animeData.slice(0, 10); 
  const animeDataSlice = animeData;


  return (
    <div className={styles.recommendationContainer}>
      {
        animeData.length > 0
        && (
        <>
          <div className={styles.titleContainer}>
            <h3>{title}</h3>
            {
              (animeData.length > 10)
              && (
              <button type="button" onClick={() => setShowMore((show) => !show)}>
                {showMore ? 'Show Less' : 'Show More'}
              </button>
              )
            }
          </div>
          <div className={`${styles.recommendationGrid} ${showMore && styles.showMore}`}>
            {
              animeDataSlice.map(({ node, num_recommendations, relation_type_formatted }, i) => (
                <>
                  <MiniCard
                    key={node.id}
                    data={node}
                    num_recommendations={num_recommendations}
                    relation_type_formatted={relation_type_formatted}
                    i={i}
                  />
                </>
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
