<template>
  <table class="w-full table-auto my-2">
    <thead class="text-center">
      <tr class="border-b border-black">
        <th class="w-1/12">ID</th>
        <th class="w-4/12">Name</th>
        <th class="w-3/12">Qty</th>
        <th class="w-3/12">Price</th>
        <th class="w-1/12">Act</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <slot />
    </tbody>
  </table>
</template>
