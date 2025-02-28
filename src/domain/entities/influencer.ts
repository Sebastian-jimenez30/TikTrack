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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.engagementVisualizationRate =
      this.calculateEngagementVisualizationRate();
  }

  calculateEngagementVisualizationRate(): number {
    return (
      (this.totalLikes +
        this.totalComments +
        this.totalShares +
        this.totalSaves) /
      this.totalViews
    );
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

  getTotalComments(): number {
    return this.totalComments;
  }

  getTotalShares(): number {
    return this.totalShares;
  }

  getTotalSaves(): number {
    return this.totalSaves;
  }

  getTotalViews(): number {
    return this.totalViews;
  }

  getTotalFollowers(): number {
    return this.totalFollowers;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
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
