import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ServLinkLogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function ServLinkLogo({ size = 'medium', color = '#1A1A2E' }: ServLinkLogoProps) {
  const scale = size === 'small' ? 0.7 : size === 'large' ? 1.4 : 1;

  return (
    <View style={styles.container}>
      {/* Ícone ServLink — duas setas estilizadas */}
      <View style={[styles.iconWrapper, { width: 36 * scale, height: 36 * scale, borderRadius: 8 * scale }]}>
        <View style={styles.iconInner}>
          <View style={[styles.arrowUp, { borderBottomWidth: 10 * scale, borderLeftWidth: 6 * scale, borderRightWidth: 6 * scale }]} />
          <View style={[styles.arrowDown, { borderTopWidth: 10 * scale, borderLeftWidth: 6 * scale, borderRightWidth: 6 * scale }]} />
        </View>
      </View>
      <Text style={[styles.logoText, { fontSize: 22 * scale, color }]}>ServLink</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  arrowUp: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffffff',
  },
  arrowDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
  },
  logoText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
