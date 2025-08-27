import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  counter: defineTable({
    value: v.number(),
    updatedAt: v.number(),
  }),
  
  actions: defineTable({
    label: v.string(),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),
});
