// v^2 = 2 * g * h
export function calculateLaunchVelocity(targetHeight, gravity) {
    return -Math.sqrt(2 * gravity * targetHeight);
}
