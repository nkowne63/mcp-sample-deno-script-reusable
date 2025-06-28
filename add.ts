#!/usr/bin/env -S deno run
import { McpServer } from "npm:@modelcontextprotocol/sdk@1.13.2/server/mcp.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk@1.13.2/server/stdio.js";
import { z } from "npm:zod@3.25.67";
import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";

export const add = (a: number, b: number) => a + b

if (import.meta.main) {
  const server = new McpServer({
    name: "demo-server",
    version: "1.0.0"
  });

  server.registerTool("add",
    {
      title: "Addition Tool",
      description: "Add two numbers",
      inputSchema: { a: z.number(), b: z.number() }
    },
    ({ a, b }) => ({
      content: [{ type: "text", text: String(add(a, b)) }]
    })
  );

  const transport = new StdioServerTransport();
  console.log("server starting...")
  await server.connect(transport);
}

Deno.test({
  name: "add test",
  fn() {
    assertEquals(add(1, 5), 6)
  }
})