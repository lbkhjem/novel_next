import { Client } from "@notionhq/client";

const notion = new Client({
  auth: 'secret_3D3NsLPUOIzIXnWzf4rpuyeP9X85t9CXJdmNEd0OZTu',
});

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const blocks = [];
  let block;
  while (true) {
    const { results, next_block } = await notion.blocks.children.list({
      start_block: block,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_block) {
      break;
    }
    block = next_block;
  }
  return blocks;
}