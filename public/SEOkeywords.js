// composables/useKeywords.js
export const SEOKeyWords = () => {
  const primaryKeywords = [
    'alcohol',
    'liquor', 
    'sanitizer',
    'hand sanitizer',
    'alcoholic beverages',
    'spirits',
    'disinfectant',
  ]

  const secondaryKeywords = [
    'Desta alcohol',
    'Ethiopia alcohol',
    'Ethiopia liquor',
    'sanitizer Ethiopia',
    'alcohol Ethiopia',
    'liquor Ethiopia',
    'vodka Ethiopia',
    'spirits Ethiopia',
    'Ethiopia premium vodka',
    'liquor store',
    'alcohol manufacturer',
    'liquor company',
  ]

  const brandKeywords = [
    'Desta Vodka',
    'Desta Uozo',
    'Desta Gin', 
    'Desta Apple',
    'Desta Cognac',
    'Desta Superment',
    'Desta Coffee',
    'Desta Aprative',
    'Desta Lime',
    'Desta Zebib',
    'Desta Ananas',
    'Desta Alcohol',
    'Desta Sanitizer'
  ]

  const getAllKeywords = () => [...primaryKeywords, ...secondaryKeywords, ...brandKeywords]

  return {
    primaryKeywords,
    secondaryKeywords, 
    brandKeywords,
    getAllKeywords
  }
}