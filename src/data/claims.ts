export interface Claim {
  id: string;
  patient: string;
  dos: string; // Date of Service
  billedAmt: string;
  payerName: string;
  payerId: string;
  status: 'Paid' | 'Coded' | 'Denied' | 'Finalized paid';
  tags?: string[];
}

// Sample claims data that matches what's shown in the claims table
export const sampleClaims: Claim[] = [
  {
    id: '1',
    patient: 'John Smith',
    dos: '03/11/2022',
    billedAmt: '$410.00',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Paid'
  },
  {
    id: '2',
    patient: 'Chelsie Ghiardini',
    dos: '03/09/2022',
    billedAmt: '$37.95',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Coded'
  },
  {
    id: '3',
    patient: 'Chelsie Ghiardini',
    dos: '03/09/2022',
    billedAmt: '$37.95',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Coded'
  },
  {
    id: '4',
    patient: 'Joaquin Zelaya',
    dos: '03/09/2022',
    billedAmt: '$164.50',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Coded'
  },
  {
    id: '5',
    patient: 'Enrique Gomez',
    dos: '03/08/2022',
    billedAmt: '$78.80',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Paid'
  },
  {
    id: '6',
    patient: 'Enrique Gomez',
    dos: '03/08/2022',
    billedAmt: '$78.80',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Paid'
  },
  {
    id: '7',
    patient: 'Steve Johnson',
    dos: '03/08/2022',
    billedAmt: '$122.35',
    payerName: 'Blue Cross Blue Shield...',
    payerId: '94109',
    status: 'Denied'
  },
  {
    id: '8',
    patient: 'Steve Johnson',
    dos: '03/08/2022',
    billedAmt: '$122.35',
    payerName: 'Blue Cross Blue Shield...',
    payerId: '94109',
    status: 'Denied'
  },
  {
    id: '9',
    patient: 'Janie Smith',
    dos: '03/08/2022',
    billedAmt: '$27.80',
    payerName: 'Cigna',
    payerId: '61101',
    status: 'Coded'
  },
  {
    id: '10',
    patient: 'Sandy Thomas',
    dos: '03/07/2022',
    billedAmt: '$27.80',
    payerName: 'Cigna',
    payerId: '61101',
    status: 'Finalized paid'
  },
  {
    id: '11',
    patient: 'Michael Rodriguez',
    dos: '03/06/2022',
    billedAmt: '$485.75',
    payerName: 'Anthem Blue Cross',
    payerId: '55234',
    status: 'Paid',
    tags: ['Emergency']
  },
  {
    id: '12',
    patient: 'Sarah Chen',
    dos: '03/06/2022',
    billedAmt: '$152.00',
    payerName: 'Kaiser Permanente',
    payerId: '78901',
    status: 'Coded'
  },
  {
    id: '13',
    patient: 'David Williams',
    dos: '03/05/2022',
    billedAmt: '$89.50',
    payerName: 'Humana',
    payerId: '23456',
    status: 'Denied',
    tags: ['Prior Auth Required']
  },
  {
    id: '14',
    patient: 'Jennifer Lopez',
    dos: '03/05/2022',
    billedAmt: '$298.25',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Paid'
  },
  {
    id: '15',
    patient: 'Robert Taylor',
    dos: '03/04/2022',
    billedAmt: '$67.30',
    payerName: 'Medicare',
    payerId: '11111',
    status: 'Finalized paid',
    tags: ['Medicare']
  },
  {
    id: '16',
    patient: 'Amanda Davis',
    dos: '03/04/2022',
    billedAmt: '$156.80',
    payerName: 'Blue Cross Blue Shield',
    payerId: '94109',
    status: 'Coded'
  },
  {
    id: '17',
    patient: 'Carlos Martinez',
    dos: '03/03/2022',
    billedAmt: '$342.90',
    payerName: 'Cigna',
    payerId: '61101',
    status: 'Paid',
    tags: ['Specialist']
  },
  {
    id: '18',
    patient: 'Lisa Johnson',
    dos: '03/03/2022',
    billedAmt: '$78.45',
    payerName: 'Medicaid',
    payerId: '99999',
    status: 'Denied',
    tags: ['Medicaid', 'Resubmit']
  },
  {
    id: '19',
    patient: 'Kevin Brown',
    dos: '03/02/2022',
    billedAmt: '$245.60',
    payerName: 'Aetna',
    payerId: '12345',
    status: 'Coded'
  },
  {
    id: '20',
    patient: 'Michelle White',
    dos: '03/02/2022',
    billedAmt: '$189.75',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Paid'
  },
  {
    id: '21',
    patient: 'Thomas Anderson',
    dos: '03/01/2022',
    billedAmt: '$456.20',
    payerName: 'Anthem Blue Cross',
    payerId: '55234',
    status: 'Denied',
    tags: ['High Value', 'Review Required']
  },
  {
    id: '22',
    patient: 'Jessica Garcia',
    dos: '03/01/2022',
    billedAmt: '$92.15',
    payerName: 'Kaiser Permanente',
    payerId: '78901',
    status: 'Finalized paid'
  },
  {
    id: '23',
    patient: 'Mark Thompson',
    dos: '02/28/2022',
    billedAmt: '$134.50',
    payerName: 'Humana',
    payerId: '23456',
    status: 'Coded'
  },
  {
    id: '24',
    patient: 'Ashley Miller',
    dos: '02/28/2022',
    billedAmt: '$367.85',
    payerName: 'Blue Cross Blue Shield',
    payerId: '94109',
    status: 'Paid',
    tags: ['Surgery']
  },
  {
    id: '25',
    patient: 'Christopher Lee',
    dos: '02/27/2022',
    billedAmt: '$58.90',
    payerName: 'Cigna',
    payerId: '61101',
    status: 'Denied'
  },
  {
    id: '26',
    patient: 'Rachel Wilson',
    dos: '02/27/2022',
    billedAmt: '$276.40',
    payerName: 'Medicare',
    payerId: '11111',
    status: 'Finalized paid',
    tags: ['Medicare', 'Annual']
  },
  {
    id: '27',
    patient: 'Daniel Moore',
    dos: '02/26/2022',
    billedAmt: '$198.70',
    payerName: 'Aetna',
    payerId: '12345',
    status: 'Coded'
  },
  {
    id: '28',
    patient: 'Stephanie Clark',
    dos: '02/26/2022',
    billedAmt: '$85.25',
    payerName: 'United Healthcare',
    payerId: '84909',
    status: 'Paid'
  },
  {
    id: '29',
    patient: 'Nicholas Hall',
    dos: '02/25/2022',
    billedAmt: '$412.35',
    payerName: 'Anthem Blue Cross',
    payerId: '55234',
    status: 'Denied',
    tags: ['Imaging', 'Prior Auth']
  },
  {
    id: '30',
    patient: 'Megan Adams',
    dos: '02/25/2022',
    billedAmt: '$127.80',
    payerName: 'Kaiser Permanente',
    payerId: '78901',
    status: 'Coded'
  }
];

export const getClaimById = (id: string): Claim | undefined => {
  return sampleClaims.find(claim => claim.id === id);
};