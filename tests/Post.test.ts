import { createTestContext } from "./__helpers";

const ctx = createTestContext();

it("ensures a draft can be created and published", async () => {
  // Create a new draft
  const draftResult = await ctx.client.request(`
    mutation {
    createDraft(title: "Nexus", body: "...") {
          id
          title
          body
          published
        }
      }
    `);

  // Snapshot that draft and expect to be false
  expect(draftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "body": "...",
        "id": 13,
        "published": false,
        "title": "Nexus",
      },
    }
  `);

  // Publish draft - change published to true

  const publishResult = await ctx.client.request(
    `
  mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id }
  );

  // Snapshot the published draft and expect it to be true
  expect(publishResult).toMatchInlineSnapshot(`
    Object {
      "publish": Object {
        "body": "...",
        "id": 13,
        "published": true,
        "title": "Nexus",
      },
    }
  `);

  const persistedData = await ctx.db.post.findMany();
  expect(persistedData).toMatchInlineSnapshot(`
    Array [
      Object {
        "body": "NISSE",
        "id": 1,
        "published": true,
        "title": "HEI",
      },
      Object {
        "body": "HEHEHEHE",
        "id": 2,
        "published": true,
        "title": "LOLOLOL",
      },
      Object {
        "body": "...",
        "id": 3,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 4,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 5,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 6,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 7,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 8,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 9,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 10,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 11,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 12,
        "published": true,
        "title": "Nexus",
      },
      Object {
        "body": "...",
        "id": 13,
        "published": true,
        "title": "Nexus",
      },
    ]
  `);
});
