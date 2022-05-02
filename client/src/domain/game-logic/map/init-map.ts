import { TerritoryStatus } from '../../../utils/constants';
import { Territory } from '../../entity';

export function initTerritories(): Territory[] {
  const territories = [
    {
      name: 'Torino',
      top: '9%',
      left: '7.8%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Genova', 'Milano'],
    },
    {
      name: 'Genova',
      top: '23.5%',
      left: '12.8%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Torino', 'Milano', 'Parma'],
    },
    {
      name: 'Milano',
      top: '8%',
      left: '27%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Genova', 'Parma', 'Modena', 'Mantova', 'Venezia'],
    },
    {
      name: 'Venezia',
      top: '15.2%',
      left: '64.6%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Milano', 'Mantova', 'Ferrara'],
    },
    {
      name: 'Mantova',
      top: '18.5%',
      left: '42.8%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Milano', 'Modena', 'Ferrara'],
    },
    {
      name: 'Modena',
      top: '25.5%',
      left: '41%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: [
        'Milano',
        'Mantova',
        'Ferrara',
        'Bologna',
        'Firenze',
        'Curra',
        'Parma',
      ],
    },
    {
      name: 'Parma',
      top: '33.5%',
      left: '26.5%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Genova', 'Milano', 'Modena', 'Curra'],
    },
    {
      name: 'Curra',
      top: '40%',
      left: '25.65%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Parma', 'Modena', 'Firenze'],
    },
    {
      name: 'Urbino',
      top: '47.5%',
      left: '65.25%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Firenze', 'Bologna', 'Speleto', 'Aurona'],
    },
    {
      name: 'Aurona',
      top: '53.2%',
      left: '78.3%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Speleto', 'Urbino', 'Napoli'],
    },
    {
      name: 'Siena',
      top: '51.5%',
      left: '33.5%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Firenze', 'Roma'],
    },
    {
      name: 'Firenze',
      top: '41.35%',
      left: '45.3%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: [
        'Curra',
        'Modena',
        'Bologna',
        'Siena',
        'Urbino',
        'Speleto',
        'Roma',
      ],
    },
    {
      name: 'Bologna',
      top: '31.8%',
      left: '49%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Firenze', 'Modena', 'Ferrara', 'Urbino'],
    },
    {
      name: 'Ferrara',
      top: '26.8%',
      left: '55.5%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Bologna', 'Modena', 'Mantova', 'Venezia'],
    },
    {
      name: 'Speleto',
      top: '58.8%',
      left: '57.25%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Firenze', 'Urbino', 'Aurona', 'Napoli', 'Roma'],
    },
    {
      name: 'Roma',
      top: '73.5%',
      left: '54.25%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Siena', 'Firenze', 'Speleto', 'Napoli'],
    },
    {
      name: 'Napoli',
      top: '88.5%',
      left: '79%',
      status: TerritoryStatus.FREE,
      owner: null,
      adjacentTo: ['Roma', 'Speleto', 'Aurona'],
    },
  ];
  return territories;
}
