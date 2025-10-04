export const SEO_KEYWORDS = () => {
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

    'Ethiopian premium vodka',

    'Ethiopian  vodka',
    'Ethiopian  gin',
    'Ethiopian  Uozo',
    'Ethiopian  Zebib',

    'Ethiopian  alcohol',
    'Ethiopian  liquor',
    'Ethiopian sanitizer',
    'Ethiopian spirits',

    'liquor store',
    'alcohol store',

    'alcohol manufacturer',
    'liquor manufacturer',

    'liquor company',
    'liquor factory',
    'alcohol company',
    'alcohol factory'
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