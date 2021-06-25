import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { Category } from '../Category';

import { categories } from '../../utils/categories';
import { styles } from './styles';

type Props = {
  categorySelected: string;
  hasCheckBox?: boolean;
  setCategory: (categoryId: string) => void;
};
export const CategorySelect: React.FC<Props> = ({
  categorySelected,
  hasCheckBox = false,
  setCategory,
}) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => (
        <Category
          hasCheckBox={hasCheckBox}
          key={category.id}
          title={category.title}
          icon={category.icon}
          onPress={() => setCategory(category.id)}
          checked={category.id === categorySelected}
        />
      ))}
    </ScrollView>
  );
};
