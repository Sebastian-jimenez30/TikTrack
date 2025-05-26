export type Status = "active" | "inactive" | "reported";

export interface FilterOptions {
  city?: string;
  followers?: string;
  engagementVisualizationRate?: string;
  updatedAt?: string;
  status?: Status;
}

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
  status: Status;
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
    status: Status,
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
    this.status = status;
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

  static getFilters(): object[] {
    return [
      {
        name: "city",
        options: [
          { value: "Medellín" },
          { value: "Bogota" },
          { value: "Cali" },
          { value: "Barranquilla" },
          { value: "Cartagena" },
          { value: "Bucaramanga" },
          { value: "Pereira" },
          { value: "Santa Marta" },
          { value: "Cúcuta" },
          { value: "Manizales" },
          { value: "Ibagué" },
          { value: "Pasto" },
          { value: "Neiva" },
          { value: "Villavicencio" },
          { value: "Soledad" },
        ],
      },
      {
        name: "followers",
        options: [
          { value: "10K-50K" },
          { value: "50K-100K" },
          { value: "100K-500K" },
          { value: "500K-1M" },
          { value: "1M+" },
        ],
      },
      {
        name: "engagementVisualizationRate",
        options: [
          { value: ">=3%" },
          { value: ">=5%" },
          { value: ">=7%" },
          { value: ">=10%" },
          { value: ">=15%" },
        ],
      },
      {
        name: "updatedAt",
        options: [
          { value: new Date().toISOString().split("T")[0] },
          {
            value: new Date(new Date().setDate(new Date().getDate() - 7))
              .toISOString()
              .split("T")[0],
          },
          {
            value: new Date(new Date().setDate(new Date().getDate() - 30))
              .toISOString()
              .split("T")[0],
          },
        ],
      },
    ];
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

  getStatus(): Status {
    return this.status;
  }

  getCreatedAt(): string {
    return this.createdAt.toISOString().split("T")[0];
  }

  getUpdatedAt(): string {
    return this.updatedAt.toISOString().split("T")[0];
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

  setStatus(status: Status): void {
    this.status = status;
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
