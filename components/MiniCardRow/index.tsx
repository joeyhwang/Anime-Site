/* eslint-disable react/require-default-props */
import React from 'react';
import { Anime } from 'components/Interfaces';
import styles from 'styles/MiniCardRow.module.scss';
import MiniCard from './MiniCard';

interface Recommendations {
  node: Anime, num_recommendations: number
}

interface RelatedAnime {
  node: Anime, relation_type_formatted: string,
}

interface Props {
  recommendations?: Recommendations[],
  relatedAnime?: RelatedAnime[],
  title: string,
}

const MiniCardRow = ({ recommendations = [], relatedAnime = [], title }: Props) => {
  console.log(recommendations);

  return (
    <div className={styles.recommendationContainer}>
      {
        recommendations.length > 0
        && (
        <>
          <h3>{title}</h3>
          <div className={styles.recommendationGrid}>
            {
              recommendations.map(({ node, num_recommendations }) => (
                <div key={node.id}>
                  <MiniCard
                    data={node}
                    num_recommendations={num_recommendations}
                  />
                </div>
              ))
            }
          </div>
        </>
        )
      }

      {
        relatedAnime.length > 0
        && (
        <>
          <h3>{title}</h3>
          <div className={styles.recommendationGrid}>
            {
              relatedAnime.map(({ node, relation_type_formatted }) => (
                <div key={node.id}>
                  <MiniCard
                    data={node}
                    relation_type_formatted={relation_type_formatted}
                  />
                </div>
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
