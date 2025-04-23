export function calculateRevenueSum(data: any): number {
    if (!data?.organizations?.length) return 0;
  
    return data.organizations
      .flatMap((org: any) => org.scooters ?? [])
      .flatMap((scooter: any) => scooter.rides ?? [])
      .reduce((sum: number, ride: any) => sum + (ride.total_cost || 0), 0);
  }
  