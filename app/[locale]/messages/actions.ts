"use server";

import { messageController } from "~/src/interface-adapters/controllers/message.controller";
import { revalidatePath } from "next/cache";

export async function createMessage(content: string) {
  try {
    await messageController.create({ params: { content } });
    revalidatePath("/messages");
    return { success: true };
  } catch (error) {
    console.error("Error creating message:", error);
    return { success: false, error: "Failed to create message" };
  }
}

export async function updateMessage(id: number, content: string) {
  try {
    await messageController.update({ params: { id, content } });
    revalidatePath("/messages");
    return { success: true };
  } catch (error) {
    console.error("Error updating message:", error);
    return { success: false, error: "Failed to update message" };
  }
}

export async function deleteMessage(id: number) {
  try {
    await messageController.delete({ params: { id } });
    revalidatePath("/messages");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: "Failed to delete message" };
  }
}
