import { faker } from "@faker-js/faker";
import User from "../modules/users/user.model";


const USERS_COUNT = 20;

const seedUsers = async () => {
  // Remove old users
  await User.deleteMany({});

  console.log("🗑️ Old users deleted");

  // Generate users
  const users = Array.from({ length: USERS_COUNT }, (_, index) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `user${index + 1}@example.com`,
    phone: faker.phone.number(),
    address: faker.location.streetAddress({
      useFullAddress: true,
    }),
    password: "Password123",


    role: faker.helpers.weightedArrayElement([
      { value: "user", weight: 90 },
      { value: "admin", weight: 5 },
      { value: "business-manager", weight: 4 },
      { value: "super-admin", weight: 1 },
    ]),

    isVerified: faker.datatype.boolean(0.9),
    isBlocked: faker.datatype.boolean(0.05),
    summary: "",
  }));

  const createdUsers = await User.create(users);
  console.log(`✅ ${createdUsers.length} users created successfully`);
};

export default seedUsers;