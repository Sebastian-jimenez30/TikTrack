class Influencer {
  id: number;
  username: string;
  profileName: string;
  profilePicture: string;
  profileUrl: string;
  averageLikes: number;
  averageComments: number;
  averageShares: number;
  averageSaves: number;
  averageViews: number;
  followers: number;
  city: string;
  featuredVideos: string[];
  createdAt: Date;
  updatedAt: Date;
  engagementVisualizationRate: number;

  constructor(
    id: number,
    username: string,
    profileName: string,
    profilePicture: string,
    profileUrl: string,
    averageLikes: number,
    averageComments: number,
    averageShares: number,
    averageSaves: number,
    averageViews: number,
    followers: number,
    city: string,
    featuredVideos: string[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.profileName = profileName;
    this.profilePicture = profilePicture;
    this.profileUrl = profileUrl;
    this.averageLikes = averageLikes;
    this.averageComments = averageComments;
    this.averageShares = averageShares;
    this.averageSaves = averageSaves;
    this.averageViews = averageViews;
    this.followers = followers;
    this.city = city;
    this.featuredVideos = featuredVideos;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.engagementVisualizationRate =
      this.calculateEngagementVisualizationRate();
  }

  calculateEngagementVisualizationRate(): number {
    const engagementVisualizationRate = (
      ((this.averageLikes +
        this.averageComments +
        this.averageShares +
        this.averageSaves) /
        this.averageViews) *
      100
    ).toFixed(2);
    return parseFloat(engagementVisualizationRate);
  }

  getId(): number {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getProfileName(): string {
    return this.profileName;
  }

  getProfilePicture(): string {
    return this.profilePicture;
  }

  getProfileUrl(): string {
    return this.profileUrl;
  }

  getAverageLikes(): number {
    return this.averageLikes;
  }

  getFormattedAverageLikes(): string {
    const number = this.averageLikes | 0;
    return number.toLocaleString();
  }

  getAverageComments(): number {
    return this.averageComments;
  }

  getFormattedAverageComments(): string {
    const number = this.averageComments | 0;
    return number.toLocaleString();
  }

  getAverageShares(): number {
    return this.averageShares;
  }

  getFormattedAverageShares(): string {
    const number = this.averageShares | 0;
    return number.toLocaleString();
  }

  getAverageSaves(): number {
    return this.averageSaves;
  }

  getFormattedAverageSaves(): string {
    const number = this.averageSaves | 0;
    return number.toLocaleString();
  }

  getAverageViews(): number {
    return this.averageViews;
  }

  getFormattedAverageViews(): string {
    const number = this.averageViews | 0;
    return number.toLocaleString();
  }

  getFollowers(): number {
    return this.followers;
  }

  getFormattedFollowers(): string {
    return this.followers.toLocaleString();
  }

  getCity(): string {
    return this.city;
  }

  getFeaturedVideos(): string[] {
    return this.featuredVideos;
  }

  getCreatedAt(): string {
    return this.createdAt.toLocaleDateString();
  }

  getUpdatedAt(): string {
    return this.updatedAt.toLocaleDateString();
  }

  getEngagementVisualizationRate(): number {
    return this.engagementVisualizationRate;
  }

  setId(id: number): void {
    this.id = id;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  setProfileName(profileName: string): void {
    this.profileName = profileName;
  }

  setProfilePicture(profilePicture: string): void {
    this.profilePicture = profilePicture;
  }

  setProfileUrl(profileUrl: string): void {
    this.profileUrl = profileUrl;
  }

  setAverageLikes(averageLikes: number): void {
    this.averageLikes = averageLikes;
  }

  setAverageComments(averageComments: number): void {
    this.averageComments = averageComments;
  }

  setAverageShares(averageShares: number): void {
    this.averageShares = averageShares;
  }

  setAverageSaves(averageSaves: number): void {
    this.averageSaves = averageSaves;
  }

  setAverageViews(averageViews: number): void {
    this.averageViews = averageViews;
  }

  setFollowers(followers: number): void {
    this.followers = followers;
  }

  setCity(city: string): void {
    this.city = city;
  }

  setFeaturedVideos(featuredVideos: string[]): void {
    this.featuredVideos = featuredVideos;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  setEngagementVisualizationRate(engagementVisualizationRate: number): void {
    this.engagementVisualizationRate = engagementVisualizationRate;
  }
}

export { Influencer };
