export type Chimi = {
  name: string
  image: string
  body: string
}

/** The four flagship Chimis introducing the Clover Cove world. */
export const chimis: Chimi[] = [
  {
    name: 'Clov',
    image: '/chimikinz/clov.png',
    body: 'Always curious, Clov sees every corner of Clover Cove as an adventure waiting to happen. Every new discovery is a chance to grow.',
  },
  {
    name: 'Moss',
    image: '/chimikinz/moss.png',
    body: "Calm and thoughtful, Moss believes even the smallest steps matter. Growth doesn't happen overnight, and that's perfectly okay.",
  },
  {
    name: 'Whim',
    image: '/chimikinz/whim.png',
    body: "Imaginative and unpredictable, Whim turns ordinary moments into magical ones. No one ever knows what they'll do next — and that's exactly how they like it.",
  },
  {
    name: 'Zipp',
    image: '/chimikinz/zipp.png',
    body: 'Full of energy and determination, Zipp is always moving toward the next adventure, encouraging everyone around them to keep going.',
  },
]
