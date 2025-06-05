import { getAuth } from "firebase/auth";

export const getOrgIdFromClaims = async (): Promise<string> => {
  const auth = getAuth();
  // Wait up to a short time for currentUser to become non-null
  let attempts = 0;
  while (!auth.currentUser && attempts < 10) {
    await new Promise((r) => setTimeout(r, 200)); // wait 200ms
    attempts++;
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated (after waiting)");

  const tokenResult = await user.getIdTokenResult();
  const hasuraClaims =
    tokenResult.claims["https://hasura.io/jwt/claims"] as {
      "x-hasura-organization-id": string;
      "x-hasura-user-id"?: string;
      "x-hasura-default-role"?: string;
      "x-hasura-allowed-roles"?: string[];
    };

  if (!hasuraClaims?.["x-hasura-organization-id"]) {
    throw new Error("Organization ID not found in Hasura claims");
  }

  return hasuraClaims["x-hasura-organization-id"];
};

