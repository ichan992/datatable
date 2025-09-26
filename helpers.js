
export function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, i) => val === arr2[i]);
}

export async function testColumnSort(page, colIndex) {
  const headers = page.locator("#demo thead th");
  const rows = page.locator("#demo tbody tr");

  const header = headers.nth(colIndex);

  // 🔽 Click once → Ascending
  await header.click();
  let colCells = rows.locator(`td:nth-child(${colIndex + 1})`);
  let values = await colCells.allTextContents();

  let ascSorted = [...values].sort((a, b) => a.localeCompare(b));
  expect(values).toEqual(ascSorted);

  // 🔼 Click again → Descending
  await header.click();
  values = await colCells.allTextContents();

  let descSorted = [...values].sort((a, b) => b.localeCompare(a));
  expect(values).toEqual(descSorted);
}
