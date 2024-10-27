import { faker } from '@faker-js/faker';

const getRandomTimeInLast10Minutes = () => {
  const now = new Date();
  const randomOffset = Math.floor(Math.random() * 10 * 50 * 1000); // Random offset in milliseconds
  const randomTime = new Date(now.getTime() + 3600000 - randomOffset); // Random time in the last 10 minutes
  return randomTime.toISOString().replace('T', ' ').split('.')[0];
};

const getRandomTimeInPast = () => {
  return faker.date.past().toISOString().replace('T', ' ').split('.')[0];
};

export const mockData = Array.from({ length: 100 }, (_, index) => {
  const isRecentUpdate = Math.random() < 0.7;
  return {
    mac_address: faker.internet.mac(),
    subdomain: `rpi${index + 1}`,
    last_update: isRecentUpdate
      ? getRandomTimeInLast10Minutes()
      : getRandomTimeInPast(),
    last_battery_lvl: Math.max(Math.floor(Math.random() * 100) + 1, 19),
    latitude: Math.random() * 180 - 90,
    longitude: Math.random() * 360 - 180,
  };
});
