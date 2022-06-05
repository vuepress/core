/**
 * Non-standard image sitemap options used by google
 *
 * @see https://developers.google.com/search/docs/advanced/sitemaps/image-sitemaps
 */
export interface SitemapImageOptions {
  /**
   * The URL of the image.
   */
  loc: string
}

/**
 * Non-standard video sitemap options used by google
 *
 * @see https://developers.google.com/search/docs/advanced/sitemaps/video-sitemaps
 */
export interface SitemapVideoOptions {
  /**
   * A URL pointing to the video thumbnail image file.
   */
  'thumbnail_loc': string

  /**
   * The title of the video.
   */
  'title': string

  /**
   * A description of the video. Maximum 2048 characters.
   */
  'description': string

  /**
   * A URL pointing to the actual video media file. Should be one of the supported formats.
   * HTML is not a supported format. Flash is allowed, but no longer supported on most mobile platforms,
   * and so may be indexed less well. Must not be the same as the <loc> URL.
   */
  'content_loc'?: string

  /**
   * A URL pointing to a player for a specific video. Usually this is the information
   * in the src element of an <embed> tag. Must not be the same as the <loc> URL
   */
  'player_loc'?: string

  /**
   * Duration of video in seconds
   */
  'duration'?: number

  /**
   * The date after which the video will no longer be available.
   */
  'expiration_date'?: string

  /**
   * The number of times the video has been viewed.
   */
  'view_count': number

  /**
   * The date the video was first published, in W3C format.
   */
  'publication_date'?: string

  /**
   * Whether to show or hide your video in search results from specific countries.
   */
  'restriction'?: string

  'restriction:relationship'?: string

  /**
   * The video uploader's name. Only one video:uploader is allowed per video.
   * max 255 characters.
   */
  'uploader'?: string

  /**
   * Whether to show or hide your video in search results on specified platform types.
   * This is a list of space-delimited platform types.
   *
   * @see https://support.google.com/webmasters/answer/80471?hl=en&ref_topic=4581190
   */
  'platform'?: string

  'platform:relationship'?: 'Allow' | 'Deny'

  'id'?: string
  /**
   * An arbitrary string tag describing the video.
   * Tags are generally very short descriptions of key concepts associated with a video or piece of content.
   */
  'tag'?: string[]

  /**
   * The rating of the video. Must be float numbers
   */
  'rating'?: number

  'family_friendly'?: 'YES' | 'NO'

  /**
   * Indicates whether a subscription (either paid or free) is required to view the video.
   */
  'requires_subscription'?: 'YES' | 'NO'

  /**
   * Indicates whether the video is a live stream.
   */
  'live'?: 'YES' | 'NO'
}

/**
 * Non-standard link sitemap options used by google
 *
 * @see TODO
 */
export interface SitemapLinkOptions {
  lang: string
  url: string
}

/**
 * Non-standard news sitemap options used by google
 *
 * @see TODO
 */
export interface SitemapNewsOptions {
  access: 'Registration' | 'Subscription'
  publication: {
    /**
     * Name of the news publication.
     *
     * It must exactly match the name as it appears on your articles on news.google.com,
     * except for anything in parentheses.
     */
    name: string
    /**
     * Language of your publication. Use an ISO 639 language code (2 or 3 letters).
     */
    language: string

    genres?: string

    /**
     * Article publication date in W3C format,
     * using either the "complete date" (YYYY-MM-DD) format or the "complete date plus hours, minutes, and seconds"
     */
    publication_date: string

    /**
     * The title of the news article.
     */
    title: string

    keywords?: string
    stock_tickers?: string
  }
}
