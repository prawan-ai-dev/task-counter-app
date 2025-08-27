import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get the current counter value
export const get = query({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();
    return counter?.value ?? 0;
  },
});

// Get recent actions (last 10)
export const getActions = query({
  args: {},
  handler: async (ctx) => {
    const actions = await ctx.db
      .query("actions")
      .withIndex("by_timestamp")
      .order("desc")
      .take(10);
    
    return actions.map(action => ({
      id: action._id,
      label: action.label,
      timestamp: action.timestamp,
    }));
  },
});

// Increment the counter
export const increment = mutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();
    const newValue = (counter?.value ?? 0) + 1;
    
    if (counter) {
      await ctx.db.patch(counter._id, { 
        value: newValue, 
        updatedAt: Date.now() 
      });
    } else {
      await ctx.db.insert("counter", { 
        value: newValue, 
        updatedAt: Date.now() 
      });
    }
    
    // Add action record
    await ctx.db.insert("actions", {
      label: "Added 1",
      timestamp: Date.now(),
    });
    
    return newValue;
  },
});

// Decrement the counter
export const decrement = mutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();
    const newValue = (counter?.value ?? 0) - 1;
    
    if (counter) {
      await ctx.db.patch(counter._id, { 
        value: newValue, 
        updatedAt: Date.now() 
      });
    } else {
      await ctx.db.insert("counter", { 
        value: newValue, 
        updatedAt: Date.now() 
      });
    }
    
    // Add action record
    await ctx.db.insert("actions", {
      label: "Subtracted 1",
      timestamp: Date.now(),
    });
    
    return newValue;
  },
});

// Reset the counter
export const reset = mutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();
    
    if (counter) {
      await ctx.db.patch(counter._id, { 
        value: 0, 
        updatedAt: Date.now() 
      });
    } else {
      await ctx.db.insert("counter", { 
        value: 0, 
        updatedAt: Date.now() 
      });
    }
    
    // Add action record
    await ctx.db.insert("actions", {
      label: "Reset",
      timestamp: Date.now(),
    });
    
    return 0;
  },
});
