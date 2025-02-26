import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: 10031,
  title: 'huzzah whether rear',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-02-26T04:33'),
};

export const sampleWithPartialData: IPost = {
  id: 27054,
  title: 'anesthetize plus minus',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-02-26T00:25'),
};

export const sampleWithFullData: IPost = {
  id: 17377,
  title: 'toward developing',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-02-26T16:55'),
};

export const sampleWithNewData: NewPost = {
  title: 'fatally regularly',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-02-26T03:09'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
