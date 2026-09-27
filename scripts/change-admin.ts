import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const args = process.argv.slice(2);
  const newUsername = args[0] || "admin";
  const newPassword = args[1] || "AdminUnibox2026!";

  console.log("-----------------------------------------");
  console.log("Mengubah Kredensial Administrator Unibox...");
  console.log(`Username target: ${newUsername}`);

  const existing = await prisma.adminUser.findFirst({
    where: {
      OR: [{ username: newUsername }, { email: "admin@unibox.id" }],
    },
  });

  const passwordHash = await hashPassword(newPassword);

  if (existing) {
    const updated = await prisma.adminUser.update({
      where: { id: existing.id },
      data: {
        username: newUsername,
        passwordHash,
      },
    });
    console.log("Berhasil memperbarui password akun admin:");
    console.log(`- ID: ${updated.id}`);
    console.log(`- Username: ${updated.username}`);
    console.log(`- Email: ${updated.email}`);
    console.log(`- Password Baru: ${newPassword}`);
  } else {
    const created = await prisma.adminUser.create({
      data: {
        username: newUsername,
        email: "admin@unibox.id",
        passwordHash,
        name: "Administrator Unibox",
        role: "superadmin",
      },
    });
    console.log("Akun admin baru berhasil dibuat:");
    console.log(`- Username: ${created.username}`);
    console.log(`- Password: ${newPassword}`);
  }
  console.log("-----------------------------------------");
}

main()
  .catch((err) => {
    console.error("Gagal mengubah kredensial:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
