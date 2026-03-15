import Link from "next/link";

async function slowfetch() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "slow data";
}