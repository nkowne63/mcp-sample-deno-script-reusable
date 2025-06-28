#!/usr/bin/env -S deno run
import { FastMCP } from "npm:fastmcp";
import { z } from "npm:zod";
import { assertEquals } from "jsr:@std/assert";

export const add = (a: number, b: number) => a + b

if (import.meta.main) {
  const server = new FastMCP({
    name: "demo-server",
    version: "1.0.0"
  });

  server.addTool({
    name: "add",
    description: "Add two numbers",
    parameters: z.object({
      a: z.number(),
      b: z.number(),
    }),
    execute: async (args) => {
      return await String(args.a + args.b);
    },
  });

  server.start({
    transportType: "stdio"
  })
}

Deno.test({
  name: "add test",
  fn() {
    assertEquals(add(1, 5), 6)
  }
})