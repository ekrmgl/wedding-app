import { Theme } from '@/types';

export const themes: Theme[] = [
  {
    id: 'buxton',
    name: 'Buxton',
    image: '/images/themes/buxton.jpg',
    colorOptions: [
      { id: 'white', value: '#ffffff' },
      { id: 'dark-blue', value: '#1a2b3c' },
      { id: 'black', value: '#000000' }
    ],
    hasMultiPage: true,
    fontFamily: 'Cormorant Garamond, serif', // Varsayılan font ailesi eklendi
    decorations: { // Varsayılan dekorasyon
      top: 'https://images.zola.com/8bde2910-3b93-460a-b746-fe5292e068e4',
      bottom: 'https://images.zola.com/ab3bd542-e004-47db-838a-8d0e3ebe75a2',
      type: 'botanical'
    }
  },
  {
    id: 'galata',
    name: 'Galata',
    image: '/images/themes/galata.jpg',
    colorOptions: [
      { id: 'white', value: '#ffffff' }
    ],
    hasMultiPage: true,
    fontFamily: 'Cormorant Garamond, serif', // Varsayılan font ailesi eklendi
    decorations: { // Varsayılan dekorasyon
      top: 'https://images.zola.com/8bde2910-3b93-460a-b746-fe5292e068e4',
      bottom: 'https://images.zola.com/ab3bd542-e004-47db-838a-8d0e3ebe75a2',
      type: 'botanical'
    }
  },
  {
    id: 'octavia',
    name: 'Octavia',
    image: '/images/themes/octavia.jpg',
    colorOptions: [
      { id: 'white', value: '#ffffff' },
      { id: 'dark-green', value: '#1a2b3c' },
      { id: 'green', value: '#4a5f2d' },
      { id: 'gray', value: '#cccccc' }
    ],
    hasMultiPage: true,
    fontFamily: 'Cormorant Garamond, serif', // Varsayılan font ailesi eklendi
    decorations: { // Varsayılan dekorasyon
      top: 'https://images.zola.com/8bde2910-3b93-460a-b746-fe5292e068e4',
      bottom: 'https://images.zola.com/ab3bd542-e004-47db-838a-8d0e3ebe75a2',
      type: 'botanical'
    }
  },
  {
    id: 'goundry',
    name: 'Goundry',
    image: '/images/themes/goundry.jpg',
    colorOptions: [
      { id: 'pink', value: '#d8a9b6' },
      { id: 'black', value: '#000000' },
      { id: 'dark-green', value: '#1a2b3c' },
      { id: 'blue', value: '#4a78a5' }
    ],
    hasMultiPage: false,
    fontFamily: 'Cormorant Garamond, serif', // Varsayılan font ailesi eklendi
    decorations: { // Varsayılan dekorasyon
      top: 'https://images.zola.com/8bde2910-3b93-460a-b746-fe5292e068e4',
      bottom: 'https://images.zola.com/ab3bd542-e004-47db-838a-8d0e3ebe75a2',
      type: 'botanical'
    }
  },
  {
    id: 'nahomi',
    name: 'Nahomi',
    image: '/images/themes/nahomi.jpg',
    colorOptions: [
      { id: 'white', value: '#ffffff' },
      { id: 'navy', value: '#0f1c2e' },
      { id: 'blue', value: '#2c5282' },
      { id: 'light-blue', value: '#c8d9ea' }
    ],
    hasMultiPage: true,
    fontFamily: 'Cormorant Garamond, serif', // Varsayılan font ailesi eklendi
    decorations: { // Varsayılan dekorasyon
      top: 'https://images.zola.com/8bde2910-3b93-460a-b746-fe5292e068e4',
      bottom: 'https://images.zola.com/ab3bd542-e004-47db-838a-8d0e3ebe75a2',
      type: 'botanical'
    }
  },
  {
    id: 'morrison',
    name: 'Morrison',
    image: '/images/themes/morrison.jpg',
    colorOptions: [
      { id: 'white', value: '#ffffff' },
      { id: 'light-pink', value: '#fadadd' },
      { id: 'peach', value: '#ffcba4' },
      { id: 'mint', value: '#c1e1c1' },
      { id: 'light-gray', value: '#e0e0e0' },
      { id: 'light-peach', value: '#ffe5b4' }
    ],
    hasMultiPage: true,
    fontFamily: 'Cormorant Garamond, serif', // Varsayılan font ailesi eklendi
    decorations: { // Varsayılan dekorasyon
      top: 'https://images.zola.com/8bde2910-3b93-460a-b746-fe5292e068e4',
      bottom: 'https://images.zola.com/ab3bd542-e004-47db-838a-8d0e3ebe75a2',
      type: 'botanical'
    }
  }
];

export const getThemes = () => themes;
export const getThemeById = (id: string) => themes.find(theme => theme.id === id);