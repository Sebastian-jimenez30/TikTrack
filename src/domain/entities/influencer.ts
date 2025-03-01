class Influencer {
  id: number;
  username: string;
  profileName: string;
  profilePicture: string;
  profileUrl: string;
  profileDescription: string;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalSaves: number;
  totalViews: number;
  totalFollowers: number;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  engagementVisualizationRate: number;

  constructor(
    id: number,
    username: string,
    profileName: string,
    profilePicture: string,
    profileUrl: string,
    profileDescription: string,
    totalLikes: number,
    totalComments: number,
    totalShares: number,
    totalSaves: number,
    totalViews: number,
    totalFollowers: number,
    city: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.profileName = profileName;
    this.profilePicture = profilePicture;
    this.profileUrl = profileUrl;
    this.profileDescription = profileDescription;
    this.totalLikes = totalLikes;
    this.totalComments = totalComments;
    this.totalShares = totalShares;
    this.totalSaves = totalSaves;
    this.totalViews = totalViews;
    this.totalFollowers = totalFollowers;
    this.city = city;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.engagementVisualizationRate =
      this.calculateEngagementVisualizationRate();
  }

  calculateEngagementVisualizationRate(): number {
    const engagementVisualizationRate = (((this.totalLikes + this.totalComments + this.totalShares + this.totalSaves)/this.totalViews)*100).toFixed(2);
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

  getProfileDescription(): string {
    return this.profileDescription;
  }

  getTotalLikes(): number {
    return this.totalLikes;
  }

  getFormattedTotalLikes(): string {
    return this.totalLikes.toLocaleString();
  }

  getTotalComments(): number {
    return this.totalComments;
  }

  getFormattedTotalComments(): string {
    return this.totalComments.toLocaleString();
  }

  getTotalShares(): number {
    return this.totalShares;
  }

  getFormattedTotalShares(): string {
    return this.totalShares.toLocaleString();
  }

  getTotalSaves(): number {
    return this.totalSaves;
  }

  getFormattedTotalSaves(): string {
    return this.totalSaves.toLocaleString();
  }

  getTotalViews(): number {
    return this.totalViews;
  }

  getFormattedTotalViews(): string {
    return this.totalViews.toLocaleString();
  }

  getTotalFollowers(): number {
    return this.totalFollowers;
  }

  getFormattedTotalFollowers(): string {
    return this.totalFollowers.toLocaleString();
  }

  getCity(): string {
    return this.city;
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

  setProfileDescription(profileDescription: string): void {
    this.profileDescription = profileDescription;
  }

  setTotalLikes(totalLikes: number): void {
    this.totalLikes = totalLikes;
  }

  setTotalComments(totalComments: number): void {
    this.totalComments = totalComments;
  }

  setTotalShares(totalShares: number): void {
    this.totalShares = totalShares;
  }

  setTotalSaves(totalSaves: number): void {
    this.totalSaves = totalSaves;
  }

  setTotalViews(totalViews: number): void {
    this.totalViews = totalViews;
  }

  setTotalFollowers(totalFollowers: number): void {
    this.totalFollowers = totalFollowers;
  }

  setCity(city: string): void {
    this.city = city;
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
