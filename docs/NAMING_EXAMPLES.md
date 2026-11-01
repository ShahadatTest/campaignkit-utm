# Campaign naming examples / Kampanya adlandırma örnekleri

Invented examples for consistent `utm_source`, `utm_medium`, and `utm_campaign` values before you use your own data. Destinations stay on `example.com`. These values were checked against CampaignKit’s `buildLink` helper.

Gerçek müşteri veya kişisel veri kullanmayın. Aşağıdaki örnekler `example.com` üzerindedir ve `buildLink` davranışıyla uyumludur.

## Shared rules / Ortak kurallar

- Prefer lowercase ASCII and underscores (`autumn_launch`), not spaces or Title Case. Uppercase letters (including Turkish `İĞÜŞÖÇ`) and spaces produce **warnings**; CampaignKit does **not** rewrite names unless you click normalize.
- Normalization is an explicit action. Silent auto-fix of campaign names would make analytics reports harder to reconcile.
- Consistent naming helps reports group the same campaign. It does **not** measure clicks, attribute sales, or replace your analytics setup on the destination site.

Özet: küçük harf ve alt çizgi tercih edin; büyük harf/boşluk uyarı verir; normalleştirme siz basınca çalışır; tutarlı isim tıklama veya satış ölçmez.

## 1. Newsletter / Bülten

| Field | Value |
| --- | --- |
| Destination | `https://example.com/newsletter/autumn` |
| source | `newsletter` |
| medium | `email` |
| campaign | `autumn_launch` |
| content | `header` |
| term | _(empty)_ |

Generated link:

```text
https://example.com/newsletter/autumn?utm_source=newsletter&utm_medium=email&utm_campaign=autumn_launch&utm_content=header
```

**EN:** Same campaign name as the social examples below so email and social report under one `utm_campaign`. Content marks the header CTA in the mail.

**TR:** Aşağıdaki sosyal örneklerle aynı `utm_campaign` kullanılır; böylece bülten ve sosyal aynı kampanya altında toplanır. `content` e-postadaki üst çağrı düğmesini ayırır.

## 2. Organic social / Organik sosyal

| Field | Value |
| --- | --- |
| Destination | `https://example.com/shop?ref=bio` |
| source | `instagram` |
| medium | `social` |
| campaign | `autumn_launch` |
| content | `story` |
| term | _(empty)_ |

Generated link:

```text
https://example.com/shop?ref=bio&utm_source=instagram&utm_medium=social&utm_campaign=autumn_launch&utm_content=story
```

**EN:** Existing `ref=bio` stays; CampaignKit only sets the `utm_*` fields. Medium `social` keeps organic placement separate from paid.

**TR:** Var olan `ref=bio` korunur; yalnızca `utm_*` alanları yazılır. `social` medium’u ücretli trafikten ayırır.

## 3. Paid social / Ücretli sosyal

| Field | Value |
| --- | --- |
| Destination | `https://example.com/shop` |
| source | `meta` |
| medium | `paid_social` |
| campaign | `autumn_launch` |
| content | `carousel` |
| term | `lookalike` |

Generated link:

```text
https://example.com/shop?utm_source=meta&utm_medium=paid_social&utm_campaign=autumn_launch&utm_content=carousel&utm_term=lookalike
```

**EN:** `paid_social` is distinct from organic `social`. Optional `term` records the audience slice; it is not required by CampaignKit validation.

**TR:** `paid_social`, organik `social` değerinden ayrıdır. İsteğe bağlı `term` kitle dilimini kaydeder; CampaignKit bunu zorunlu tutmaz.

## What not to do / Yapılmaması gerekenler

| Fragile value | Why |
| --- | --- |
| `Autumn Launch` | Spaces and capitals warn; reports may split if mixed with `autumn_launch`. |
| `Instagram` vs `instagram` | Case differs; Analytics treats them as different sources unless you normalize deliberately. |
| Relying on UTMs alone for ROI | CampaignKit prepares URLs only. Clicks and conversions belong to the destination analytics stack. |

| Kırılgan değer | Neden |
| --- | --- |
| `Autumn Launch` | Boşluk ve büyük harf uyarı verir; `autumn_launch` ile karışınca rapor parçalanabilir. |
| `Instagram` / `instagram` | Büyük-küçük harf farkı ayrı kaynak sayılabilir. |
| Yalnızca UTM ile ROI | CampaignKit URL hazırlar; ölçüm hedef sitedeki analitikte kalır. |
