<!-- FLEX-SHRINK -->

<div class="flex w-[300px] border">
  <div class="w-64 bg-red-300">A</div>
  <div class="w-64 bg-blue-300">B</div>
</div>

Problem:
Container = 300px
A = 256px
B = 256px
❌ Total = 512px → space nahi hai.

👉 Ab kya hoga?
✔ Dono items shrink ho jayenge (default: flex-shrink: 1)

Question => shrink-0 kyu use karte hain?

<div class="flex w-[300px]">
  <div class="w-64 shrink-0 bg-red-300">A</div>
  <div class="w-64 bg-blue-300">B</div>
</div>

Ab:

A → shrink nahi hoga ❌
B → majboori me shrink hoga ✔

🧠 Real Life Use Cases

1. Sidebar hamesha same size ka rahe
2. Button / Input chote na ho.
3. Image / Avatar chote na ho.

⚡ Visual Samajh

👉 Soch:

3 log ek bench pe baithe hain
bench chhoti ho gayi 😄

✔ shrink: 1 → sab adjust ho jaate hain
❌ shrink-0 → ek banda bole: "main nahi hilunga"
👉 baaki log adjust karte hain.

<!--  -->

👉 flex-basis = starting size (initial width)
👉 flex-grow = extra space ka distribution

<!-- In tailwind css -->

| CSS Property | Tailwind Class       |
| ------------ | -------------------- |
| flex-grow    | `grow`, `grow-0`     |
| flex-shrink  | `shrink`, `shrink-0` |
| flex-basis   | `basis-*`            |

🧱 2. Shortcuts (Tailwind ka magic)
✅ flex-1

👉 Behind the scenes:
flex-grow: 1;     // for extra space
flex-shrink: 1;
flex-basis: 0%;   // for size


