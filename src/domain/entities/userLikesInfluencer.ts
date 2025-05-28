class UserLikesInfluencer {
  userId: number;
  influencerId: number;
  likedAt: Date;

  constructor(userId: number, influencerId: number, likedAt?: Date) {
    this.userId = userId;
    this.influencerId = influencerId;
    this.likedAt = likedAt ?? new Date();
  }

  getUserId(): number {
    return this.userId;
  }

  getInfluencerId(): number {
    return this.influencerId;
  }

  getLikedAt(): string {
    return this.likedAt.toISOString().split("T")[0];
  }

  setLikedAt(date: Date): void {
    this.likedAt = date;
  }

  equals(other: UserLikesInfluencer): boolean {
    return (
      this.userId === other.userId && this.influencerId === other.influencerId
    );
  }
}

export { UserLikesInfluencer };
