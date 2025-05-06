
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model Assignment
 * 
 */
export type Assignment = $Result.DefaultSelection<Prisma.$AssignmentPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model ParentStudentRelationship
 * 
 */
export type ParentStudentRelationship = $Result.DefaultSelection<Prisma.$ParentStudentRelationshipPayload>
/**
 * Model ParentNotification
 * 
 */
export type ParentNotification = $Result.DefaultSelection<Prisma.$ParentNotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  student: 'student',
  teacher: 'teacher',
  admin: 'admin',
  parent: 'parent'
};

export type Role = (typeof Role)[keyof typeof Role]


export const NotificationType: {
  grade: 'grade',
  attendance: 'attendance',
  behavior: 'behavior',
  announcement: 'announcement'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignment`: Exposes CRUD operations for the **Assignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assignments
    * const assignments = await prisma.assignment.findMany()
    * ```
    */
  get assignment(): Prisma.AssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parentStudentRelationship`: Exposes CRUD operations for the **ParentStudentRelationship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParentStudentRelationships
    * const parentStudentRelationships = await prisma.parentStudentRelationship.findMany()
    * ```
    */
  get parentStudentRelationship(): Prisma.ParentStudentRelationshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parentNotification`: Exposes CRUD operations for the **ParentNotification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParentNotifications
    * const parentNotifications = await prisma.parentNotification.findMany()
    * ```
    */
  get parentNotification(): Prisma.ParentNotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Class: 'Class',
    Enrollment: 'Enrollment',
    Assignment: 'Assignment',
    Submission: 'Submission',
    Announcement: 'Announcement',
    ParentStudentRelationship: 'ParentStudentRelationship',
    ParentNotification: 'ParentNotification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "class" | "enrollment" | "assignment" | "submission" | "announcement" | "parentStudentRelationship" | "parentNotification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      Assignment: {
        payload: Prisma.$AssignmentPayload<ExtArgs>
        fields: Prisma.AssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findFirst: {
            args: Prisma.AssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findMany: {
            args: Prisma.AssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          create: {
            args: Prisma.AssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          createMany: {
            args: Prisma.AssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          delete: {
            args: Prisma.AssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          update: {
            args: Prisma.AssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          deleteMany: {
            args: Prisma.AssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          upsert: {
            args: Prisma.AssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          aggregate: {
            args: Prisma.AssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignment>
          }
          groupBy: {
            args: Prisma.AssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnouncementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnouncementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      ParentStudentRelationship: {
        payload: Prisma.$ParentStudentRelationshipPayload<ExtArgs>
        fields: Prisma.ParentStudentRelationshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentStudentRelationshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentStudentRelationshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>
          }
          findFirst: {
            args: Prisma.ParentStudentRelationshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentStudentRelationshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>
          }
          findMany: {
            args: Prisma.ParentStudentRelationshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>[]
          }
          create: {
            args: Prisma.ParentStudentRelationshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>
          }
          createMany: {
            args: Prisma.ParentStudentRelationshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParentStudentRelationshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>[]
          }
          delete: {
            args: Prisma.ParentStudentRelationshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>
          }
          update: {
            args: Prisma.ParentStudentRelationshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>
          }
          deleteMany: {
            args: Prisma.ParentStudentRelationshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentStudentRelationshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParentStudentRelationshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>[]
          }
          upsert: {
            args: Prisma.ParentStudentRelationshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentRelationshipPayload>
          }
          aggregate: {
            args: Prisma.ParentStudentRelationshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParentStudentRelationship>
          }
          groupBy: {
            args: Prisma.ParentStudentRelationshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentStudentRelationshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentStudentRelationshipCountArgs<ExtArgs>
            result: $Utils.Optional<ParentStudentRelationshipCountAggregateOutputType> | number
          }
        }
      }
      ParentNotification: {
        payload: Prisma.$ParentNotificationPayload<ExtArgs>
        fields: Prisma.ParentNotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentNotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentNotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>
          }
          findFirst: {
            args: Prisma.ParentNotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentNotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>
          }
          findMany: {
            args: Prisma.ParentNotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>[]
          }
          create: {
            args: Prisma.ParentNotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>
          }
          createMany: {
            args: Prisma.ParentNotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParentNotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>[]
          }
          delete: {
            args: Prisma.ParentNotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>
          }
          update: {
            args: Prisma.ParentNotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>
          }
          deleteMany: {
            args: Prisma.ParentNotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentNotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParentNotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>[]
          }
          upsert: {
            args: Prisma.ParentNotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentNotificationPayload>
          }
          aggregate: {
            args: Prisma.ParentNotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParentNotification>
          }
          groupBy: {
            args: Prisma.ParentNotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentNotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentNotificationCountArgs<ExtArgs>
            result: $Utils.Optional<ParentNotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    class?: ClassOmit
    enrollment?: EnrollmentOmit
    assignment?: AssignmentOmit
    submission?: SubmissionOmit
    announcement?: AnnouncementOmit
    parentStudentRelationship?: ParentStudentRelationshipOmit
    parentNotification?: ParentNotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    teacherClasses: number
    studentEnrollments: number
    authorAnnouncements: number
    studentSubmissions: number
    asParent: number
    asStudent: number
    parentNotifications: number
    studentNotifications: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacherClasses?: boolean | ProfileCountOutputTypeCountTeacherClassesArgs
    studentEnrollments?: boolean | ProfileCountOutputTypeCountStudentEnrollmentsArgs
    authorAnnouncements?: boolean | ProfileCountOutputTypeCountAuthorAnnouncementsArgs
    studentSubmissions?: boolean | ProfileCountOutputTypeCountStudentSubmissionsArgs
    asParent?: boolean | ProfileCountOutputTypeCountAsParentArgs
    asStudent?: boolean | ProfileCountOutputTypeCountAsStudentArgs
    parentNotifications?: boolean | ProfileCountOutputTypeCountParentNotificationsArgs
    studentNotifications?: boolean | ProfileCountOutputTypeCountStudentNotificationsArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountTeacherClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountStudentEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountAuthorAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountStudentSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountAsParentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentStudentRelationshipWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountAsStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentStudentRelationshipWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountParentNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentNotificationWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountStudentNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentNotificationWhereInput
  }


  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    enrollments: number
    assignments: number
    announcements: number
  }

  export type ClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | ClassCountOutputTypeCountEnrollmentsArgs
    assignments?: boolean | ClassCountOutputTypeCountAssignmentsArgs
    announcements?: boolean | ClassCountOutputTypeCountAnnouncementsArgs
  }

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }


  /**
   * Count Type AssignmentCountOutputType
   */

  export type AssignmentCountOutputType = {
    submissions: number
  }

  export type AssignmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | AssignmentCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * AssignmentCountOutputType without action
   */
  export type AssignmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentCountOutputType
     */
    select?: AssignmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssignmentCountOutputType without action
   */
  export type AssignmentCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type ParentStudentRelationshipCountOutputType
   */

  export type ParentStudentRelationshipCountOutputType = {
    notifications: number
  }

  export type ParentStudentRelationshipCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | ParentStudentRelationshipCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * ParentStudentRelationshipCountOutputType without action
   */
  export type ParentStudentRelationshipCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationshipCountOutputType
     */
    select?: ParentStudentRelationshipCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParentStudentRelationshipCountOutputType without action
   */
  export type ParentStudentRelationshipCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentNotificationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    updatedAt: Date | null
    username: string | null
    fullName: string | null
    avatarUrl: string | null
    email: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    updatedAt: Date | null
    username: string | null
    fullName: string | null
    avatarUrl: string | null
    email: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    updatedAt: number
    username: number
    fullName: number
    avatarUrl: number
    email: number
    role: number
    createdAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    updatedAt?: true
    username?: true
    fullName?: true
    avatarUrl?: true
    email?: true
    role?: true
    createdAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    updatedAt?: true
    username?: true
    fullName?: true
    avatarUrl?: true
    email?: true
    role?: true
    createdAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    updatedAt?: true
    username?: true
    fullName?: true
    avatarUrl?: true
    email?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    updatedAt: Date | null
    username: string | null
    fullName: string | null
    avatarUrl: string | null
    email: string | null
    role: $Enums.Role
    createdAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    updatedAt?: boolean
    username?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    teacherClasses?: boolean | Profile$teacherClassesArgs<ExtArgs>
    studentEnrollments?: boolean | Profile$studentEnrollmentsArgs<ExtArgs>
    authorAnnouncements?: boolean | Profile$authorAnnouncementsArgs<ExtArgs>
    studentSubmissions?: boolean | Profile$studentSubmissionsArgs<ExtArgs>
    asParent?: boolean | Profile$asParentArgs<ExtArgs>
    asStudent?: boolean | Profile$asStudentArgs<ExtArgs>
    parentNotifications?: boolean | Profile$parentNotificationsArgs<ExtArgs>
    studentNotifications?: boolean | Profile$studentNotificationsArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    updatedAt?: boolean
    username?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    updatedAt?: boolean
    username?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    updatedAt?: boolean
    username?: boolean
    fullName?: boolean
    avatarUrl?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "updatedAt" | "username" | "fullName" | "avatarUrl" | "email" | "role" | "createdAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacherClasses?: boolean | Profile$teacherClassesArgs<ExtArgs>
    studentEnrollments?: boolean | Profile$studentEnrollmentsArgs<ExtArgs>
    authorAnnouncements?: boolean | Profile$authorAnnouncementsArgs<ExtArgs>
    studentSubmissions?: boolean | Profile$studentSubmissionsArgs<ExtArgs>
    asParent?: boolean | Profile$asParentArgs<ExtArgs>
    asStudent?: boolean | Profile$asStudentArgs<ExtArgs>
    parentNotifications?: boolean | Profile$parentNotificationsArgs<ExtArgs>
    studentNotifications?: boolean | Profile$studentNotificationsArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      teacherClasses: Prisma.$ClassPayload<ExtArgs>[]
      studentEnrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      authorAnnouncements: Prisma.$AnnouncementPayload<ExtArgs>[]
      studentSubmissions: Prisma.$SubmissionPayload<ExtArgs>[]
      asParent: Prisma.$ParentStudentRelationshipPayload<ExtArgs>[]
      asStudent: Prisma.$ParentStudentRelationshipPayload<ExtArgs>[]
      parentNotifications: Prisma.$ParentNotificationPayload<ExtArgs>[]
      studentNotifications: Prisma.$ParentNotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      updatedAt: Date | null
      username: string | null
      fullName: string | null
      avatarUrl: string | null
      email: string | null
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacherClasses<T extends Profile$teacherClassesArgs<ExtArgs> = {}>(args?: Subset<T, Profile$teacherClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    studentEnrollments<T extends Profile$studentEnrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$studentEnrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authorAnnouncements<T extends Profile$authorAnnouncementsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$authorAnnouncementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    studentSubmissions<T extends Profile$studentSubmissionsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$studentSubmissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    asParent<T extends Profile$asParentArgs<ExtArgs> = {}>(args?: Subset<T, Profile$asParentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    asStudent<T extends Profile$asStudentArgs<ExtArgs> = {}>(args?: Subset<T, Profile$asStudentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parentNotifications<T extends Profile$parentNotificationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$parentNotificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    studentNotifications<T extends Profile$studentNotificationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$studentNotificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
    readonly username: FieldRef<"Profile", 'String'>
    readonly fullName: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'Role'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data?: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.teacherClasses
   */
  export type Profile$teacherClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Profile.studentEnrollments
   */
  export type Profile$studentEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Profile.authorAnnouncements
   */
  export type Profile$authorAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Profile.studentSubmissions
   */
  export type Profile$studentSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Profile.asParent
   */
  export type Profile$asParentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    where?: ParentStudentRelationshipWhereInput
    orderBy?: ParentStudentRelationshipOrderByWithRelationInput | ParentStudentRelationshipOrderByWithRelationInput[]
    cursor?: ParentStudentRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentStudentRelationshipScalarFieldEnum | ParentStudentRelationshipScalarFieldEnum[]
  }

  /**
   * Profile.asStudent
   */
  export type Profile$asStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    where?: ParentStudentRelationshipWhereInput
    orderBy?: ParentStudentRelationshipOrderByWithRelationInput | ParentStudentRelationshipOrderByWithRelationInput[]
    cursor?: ParentStudentRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentStudentRelationshipScalarFieldEnum | ParentStudentRelationshipScalarFieldEnum[]
  }

  /**
   * Profile.parentNotifications
   */
  export type Profile$parentNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    where?: ParentNotificationWhereInput
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    cursor?: ParentNotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentNotificationScalarFieldEnum | ParentNotificationScalarFieldEnum[]
  }

  /**
   * Profile.studentNotifications
   */
  export type Profile$studentNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    where?: ParentNotificationWhereInput
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    cursor?: ParentNotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentNotificationScalarFieldEnum | ParentNotificationScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    description: string | null
    teacherId: string | null
    imageUrl: string | null
  }

  export type ClassMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    description: string | null
    teacherId: string | null
    imageUrl: string | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    createdAt: number
    name: number
    description: number
    teacherId: number
    imageUrl: number
    _all: number
  }


  export type ClassMinAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    description?: true
    teacherId?: true
    imageUrl?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    description?: true
    teacherId?: true
    imageUrl?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    description?: true
    teacherId?: true
    imageUrl?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: string
    createdAt: Date
    name: string
    description: string | null
    teacherId: string | null
    imageUrl: string | null
    _count: ClassCountAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    description?: boolean
    teacherId?: boolean
    imageUrl?: boolean
    teacher?: boolean | Class$teacherArgs<ExtArgs>
    enrollments?: boolean | Class$enrollmentsArgs<ExtArgs>
    assignments?: boolean | Class$assignmentsArgs<ExtArgs>
    announcements?: boolean | Class$announcementsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    description?: boolean
    teacherId?: boolean
    imageUrl?: boolean
    teacher?: boolean | Class$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    description?: boolean
    teacherId?: boolean
    imageUrl?: boolean
    teacher?: boolean | Class$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    id?: boolean
    createdAt?: boolean
    name?: boolean
    description?: boolean
    teacherId?: boolean
    imageUrl?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "name" | "description" | "teacherId" | "imageUrl", ExtArgs["result"]["class"]>
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Class$teacherArgs<ExtArgs>
    enrollments?: boolean | Class$enrollmentsArgs<ExtArgs>
    assignments?: boolean | Class$assignmentsArgs<ExtArgs>
    announcements?: boolean | Class$announcementsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Class$teacherArgs<ExtArgs>
  }
  export type ClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Class$teacherArgs<ExtArgs>
  }

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      teacher: Prisma.$ProfilePayload<ExtArgs> | null
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      assignments: Prisma.$AssignmentPayload<ExtArgs>[]
      announcements: Prisma.$AnnouncementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      name: string
      description: string | null
      teacherId: string | null
      imageUrl: string | null
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {ClassUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends Class$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Class$teacherArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    enrollments<T extends Class$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Class$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    announcements<T extends Class$announcementsArgs<ExtArgs> = {}>(args?: Subset<T, Class$announcementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'String'>
    readonly createdAt: FieldRef<"Class", 'DateTime'>
    readonly name: FieldRef<"Class", 'String'>
    readonly description: FieldRef<"Class", 'String'>
    readonly teacherId: FieldRef<"Class", 'String'>
    readonly imageUrl: FieldRef<"Class", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class updateManyAndReturn
   */
  export type ClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to delete.
     */
    limit?: number
  }

  /**
   * Class.teacher
   */
  export type Class$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * Class.enrollments
   */
  export type Class$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Class.assignments
   */
  export type Class$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    cursor?: AssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Class.announcements
   */
  export type Class$announcementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    studentId: string | null
    classId: string | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    studentId: string | null
    classId: string | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    createdAt: number
    studentId: number
    classId: number
    _all: number
  }


  export type EnrollmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    studentId?: true
    classId?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    studentId?: true
    classId?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    studentId?: true
    classId?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    createdAt: Date
    studentId: string
    classId: string
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    classId?: boolean
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    classId?: boolean
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    classId?: boolean
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    classId?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "studentId" | "classId", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      student: Prisma.$ProfilePayload<ExtArgs>
      class: Prisma.$ClassPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      studentId: string
      classId: string
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments and returns the data updated in the database.
     * @param {EnrollmentUpdateManyAndReturnArgs} args - Arguments to update many Enrollments.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'String'>
    readonly createdAt: FieldRef<"Enrollment", 'DateTime'>
    readonly studentId: FieldRef<"Enrollment", 'String'>
    readonly classId: FieldRef<"Enrollment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment updateManyAndReturn
   */
  export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model Assignment
   */

  export type AggregateAssignment = {
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  export type AssignmentAvgAggregateOutputType = {
    points: number | null
  }

  export type AssignmentSumAggregateOutputType = {
    points: number | null
  }

  export type AssignmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    title: string | null
    description: string | null
    dueDate: Date | null
    classId: string | null
    points: number | null
  }

  export type AssignmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    title: string | null
    description: string | null
    dueDate: Date | null
    classId: string | null
    points: number | null
  }

  export type AssignmentCountAggregateOutputType = {
    id: number
    createdAt: number
    title: number
    description: number
    dueDate: number
    classId: number
    points: number
    _all: number
  }


  export type AssignmentAvgAggregateInputType = {
    points?: true
  }

  export type AssignmentSumAggregateInputType = {
    points?: true
  }

  export type AssignmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    description?: true
    dueDate?: true
    classId?: true
    points?: true
  }

  export type AssignmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    description?: true
    dueDate?: true
    classId?: true
    points?: true
  }

  export type AssignmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    description?: true
    dueDate?: true
    classId?: true
    points?: true
    _all?: true
  }

  export type AssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignment to aggregate.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assignments
    **/
    _count?: true | AssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentMaxAggregateInputType
  }

  export type GetAssignmentAggregateType<T extends AssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignment[P]>
      : GetScalarType<T[P], AggregateAssignment[P]>
  }




  export type AssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithAggregationInput | AssignmentOrderByWithAggregationInput[]
    by: AssignmentScalarFieldEnum[] | AssignmentScalarFieldEnum
    having?: AssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentCountAggregateInputType | true
    _avg?: AssignmentAvgAggregateInputType
    _sum?: AssignmentSumAggregateInputType
    _min?: AssignmentMinAggregateInputType
    _max?: AssignmentMaxAggregateInputType
  }

  export type AssignmentGroupByOutputType = {
    id: string
    createdAt: Date
    title: string
    description: string | null
    dueDate: Date
    classId: string
    points: number
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  type GetAssignmentGroupByPayload<T extends AssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
        }
      >
    >


  export type AssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    classId?: boolean
    points?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    submissions?: boolean | Assignment$submissionsArgs<ExtArgs>
    _count?: boolean | AssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    classId?: boolean
    points?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    classId?: boolean
    points?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    title?: boolean
    description?: boolean
    dueDate?: boolean
    classId?: boolean
    points?: boolean
  }

  export type AssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "title" | "description" | "dueDate" | "classId" | "points", ExtArgs["result"]["assignment"]>
  export type AssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    submissions?: boolean | Assignment$submissionsArgs<ExtArgs>
    _count?: boolean | AssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $AssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assignment"
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      title: string
      description: string | null
      dueDate: Date
      classId: string
      points: number
    }, ExtArgs["result"]["assignment"]>
    composites: {}
  }

  type AssignmentGetPayload<S extends boolean | null | undefined | AssignmentDefaultArgs> = $Result.GetResult<Prisma.$AssignmentPayload, S>

  type AssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentCountAggregateInputType | true
    }

  export interface AssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assignment'], meta: { name: 'Assignment' } }
    /**
     * Find zero or one Assignment that matches the filter.
     * @param {AssignmentFindUniqueArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssignmentFindUniqueArgs>(args: SelectSubset<T, AssignmentFindUniqueArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssignmentFindUniqueOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssignmentFindFirstArgs>(args?: SelectSubset<T, AssignmentFindFirstArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assignments
     * const assignments = await prisma.assignment.findMany()
     * 
     * // Get first 10 Assignments
     * const assignments = await prisma.assignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentWithIdOnly = await prisma.assignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssignmentFindManyArgs>(args?: SelectSubset<T, AssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assignment.
     * @param {AssignmentCreateArgs} args - Arguments to create a Assignment.
     * @example
     * // Create one Assignment
     * const Assignment = await prisma.assignment.create({
     *   data: {
     *     // ... data to create a Assignment
     *   }
     * })
     * 
     */
    create<T extends AssignmentCreateArgs>(args: SelectSubset<T, AssignmentCreateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assignments.
     * @param {AssignmentCreateManyArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssignmentCreateManyArgs>(args?: SelectSubset<T, AssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assignments and returns the data saved in the database.
     * @param {AssignmentCreateManyAndReturnArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assignment.
     * @param {AssignmentDeleteArgs} args - Arguments to delete one Assignment.
     * @example
     * // Delete one Assignment
     * const Assignment = await prisma.assignment.delete({
     *   where: {
     *     // ... filter to delete one Assignment
     *   }
     * })
     * 
     */
    delete<T extends AssignmentDeleteArgs>(args: SelectSubset<T, AssignmentDeleteArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assignment.
     * @param {AssignmentUpdateArgs} args - Arguments to update one Assignment.
     * @example
     * // Update one Assignment
     * const assignment = await prisma.assignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssignmentUpdateArgs>(args: SelectSubset<T, AssignmentUpdateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assignments.
     * @param {AssignmentDeleteManyArgs} args - Arguments to filter Assignments to delete.
     * @example
     * // Delete a few Assignments
     * const { count } = await prisma.assignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssignmentDeleteManyArgs>(args?: SelectSubset<T, AssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssignmentUpdateManyArgs>(args: SelectSubset<T, AssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments and returns the data updated in the database.
     * @param {AssignmentUpdateManyAndReturnArgs} args - Arguments to update many Assignments.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assignment.
     * @param {AssignmentUpsertArgs} args - Arguments to update or create a Assignment.
     * @example
     * // Update or create a Assignment
     * const assignment = await prisma.assignment.upsert({
     *   create: {
     *     // ... data to create a Assignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assignment we want to update
     *   }
     * })
     */
    upsert<T extends AssignmentUpsertArgs>(args: SelectSubset<T, AssignmentUpsertArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentCountArgs} args - Arguments to filter Assignments to count.
     * @example
     * // Count the number of Assignments
     * const count = await prisma.assignment.count({
     *   where: {
     *     // ... the filter for the Assignments we want to count
     *   }
     * })
    **/
    count<T extends AssignmentCountArgs>(
      args?: Subset<T, AssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssignmentAggregateArgs>(args: Subset<T, AssignmentAggregateArgs>): Prisma.PrismaPromise<GetAssignmentAggregateType<T>>

    /**
     * Group by Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssignmentGroupByArgs['orderBy'] }
        : { orderBy?: AssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assignment model
   */
  readonly fields: AssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submissions<T extends Assignment$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Assignment$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assignment model
   */
  interface AssignmentFieldRefs {
    readonly id: FieldRef<"Assignment", 'String'>
    readonly createdAt: FieldRef<"Assignment", 'DateTime'>
    readonly title: FieldRef<"Assignment", 'String'>
    readonly description: FieldRef<"Assignment", 'String'>
    readonly dueDate: FieldRef<"Assignment", 'DateTime'>
    readonly classId: FieldRef<"Assignment", 'String'>
    readonly points: FieldRef<"Assignment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Assignment findUnique
   */
  export type AssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findUniqueOrThrow
   */
  export type AssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findFirst
   */
  export type AssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findFirstOrThrow
   */
  export type AssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findMany
   */
  export type AssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignments to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment create
   */
  export type AssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assignment.
     */
    data: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
  }

  /**
   * Assignment createMany
   */
  export type AssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assignment createManyAndReturn
   */
  export type AssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment update
   */
  export type AssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assignment.
     */
    data: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
    /**
     * Choose, which Assignment to update.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment updateMany
   */
  export type AssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
  }

  /**
   * Assignment updateManyAndReturn
   */
  export type AssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment upsert
   */
  export type AssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assignment to update in case it exists.
     */
    where: AssignmentWhereUniqueInput
    /**
     * In case the Assignment found by the `where` argument doesn't exist, create a new Assignment with this data.
     */
    create: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
    /**
     * In case the Assignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
  }

  /**
   * Assignment delete
   */
  export type AssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter which Assignment to delete.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment deleteMany
   */
  export type AssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignments to delete
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to delete.
     */
    limit?: number
  }

  /**
   * Assignment.submissions
   */
  export type Assignment$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Assignment without action
   */
  export type AssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    grade: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    grade: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    studentId: string | null
    assignmentId: string | null
    content: string | null
    fileUrl: string | null
    grade: number | null
    feedback: string | null
    isGraded: boolean | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    studentId: string | null
    assignmentId: string | null
    content: string | null
    fileUrl: string | null
    grade: number | null
    feedback: string | null
    isGraded: boolean | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    createdAt: number
    studentId: number
    assignmentId: number
    content: number
    fileUrl: number
    grade: number
    feedback: number
    isGraded: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    grade?: true
  }

  export type SubmissionSumAggregateInputType = {
    grade?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    createdAt?: true
    studentId?: true
    assignmentId?: true
    content?: true
    fileUrl?: true
    grade?: true
    feedback?: true
    isGraded?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    studentId?: true
    assignmentId?: true
    content?: true
    fileUrl?: true
    grade?: true
    feedback?: true
    isGraded?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    createdAt?: true
    studentId?: true
    assignmentId?: true
    content?: true
    fileUrl?: true
    grade?: true
    feedback?: true
    isGraded?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    createdAt: Date
    studentId: string
    assignmentId: string
    content: string | null
    fileUrl: string | null
    grade: number | null
    feedback: string | null
    isGraded: boolean
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    assignmentId?: boolean
    content?: boolean
    fileUrl?: boolean
    grade?: boolean
    feedback?: boolean
    isGraded?: boolean
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    assignmentId?: boolean
    content?: boolean
    fileUrl?: boolean
    grade?: boolean
    feedback?: boolean
    isGraded?: boolean
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    assignmentId?: boolean
    content?: boolean
    fileUrl?: boolean
    grade?: boolean
    feedback?: boolean
    isGraded?: boolean
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    studentId?: boolean
    assignmentId?: boolean
    content?: boolean
    fileUrl?: boolean
    grade?: boolean
    feedback?: boolean
    isGraded?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "studentId" | "assignmentId" | "content" | "fileUrl" | "grade" | "feedback" | "isGraded", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      student: Prisma.$ProfilePayload<ExtArgs>
      assignment: Prisma.$AssignmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      studentId: string
      assignmentId: string
      content: string | null
      fileUrl: string | null
      grade: number | null
      feedback: string | null
      isGraded: boolean
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignment<T extends AssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssignmentDefaultArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly studentId: FieldRef<"Submission", 'String'>
    readonly assignmentId: FieldRef<"Submission", 'String'>
    readonly content: FieldRef<"Submission", 'String'>
    readonly fileUrl: FieldRef<"Submission", 'String'>
    readonly grade: FieldRef<"Submission", 'Int'>
    readonly feedback: FieldRef<"Submission", 'String'>
    readonly isGraded: FieldRef<"Submission", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    title: string | null
    content: string | null
    authorId: string | null
    classId: string | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    title: string | null
    content: string | null
    authorId: string | null
    classId: string | null
  }

  export type AnnouncementCountAggregateOutputType = {
    id: number
    createdAt: number
    title: number
    content: number
    authorId: number
    classId: number
    _all: number
  }


  export type AnnouncementMinAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    content?: true
    authorId?: true
    classId?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    content?: true
    authorId?: true
    classId?: true
  }

  export type AnnouncementCountAggregateInputType = {
    id?: true
    createdAt?: true
    title?: true
    content?: true
    authorId?: true
    classId?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    id: string
    createdAt: Date
    title: string
    content: string
    authorId: string
    classId: string | null
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    classId?: boolean
    author?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | Announcement$classArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    classId?: boolean
    author?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | Announcement$classArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    classId?: boolean
    author?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | Announcement$classArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectScalar = {
    id?: boolean
    createdAt?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    classId?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "title" | "content" | "authorId" | "classId", ExtArgs["result"]["announcement"]>
  export type AnnouncementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | Announcement$classArgs<ExtArgs>
  }
  export type AnnouncementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | Announcement$classArgs<ExtArgs>
  }
  export type AnnouncementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | ProfileDefaultArgs<ExtArgs>
    class?: boolean | Announcement$classArgs<ExtArgs>
  }

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {
      author: Prisma.$ProfilePayload<ExtArgs>
      class: Prisma.$ClassPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      title: string
      content: string
      authorId: string
      classId: string | null
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementWithIdOnly = await prisma.announcement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Announcements and returns the data saved in the database.
     * @param {AnnouncementCreateManyAndReturnArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnouncementCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnouncementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements and returns the data updated in the database.
     * @param {AnnouncementUpdateManyAndReturnArgs} args - Arguments to update many Announcements.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnouncementUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnouncementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class<T extends Announcement$classArgs<ExtArgs> = {}>(args?: Subset<T, Announcement$classArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly id: FieldRef<"Announcement", 'String'>
    readonly createdAt: FieldRef<"Announcement", 'DateTime'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly authorId: FieldRef<"Announcement", 'String'>
    readonly classId: FieldRef<"Announcement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement createManyAndReturn
   */
  export type AnnouncementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement updateManyAndReturn
   */
  export type AnnouncementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement.class
   */
  export type Announcement$classArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
  }


  /**
   * Model ParentStudentRelationship
   */

  export type AggregateParentStudentRelationship = {
    _count: ParentStudentRelationshipCountAggregateOutputType | null
    _min: ParentStudentRelationshipMinAggregateOutputType | null
    _max: ParentStudentRelationshipMaxAggregateOutputType | null
  }

  export type ParentStudentRelationshipMinAggregateOutputType = {
    id: string | null
    parentId: string | null
    studentId: string | null
    createdAt: Date | null
    relationshipType: string | null
  }

  export type ParentStudentRelationshipMaxAggregateOutputType = {
    id: string | null
    parentId: string | null
    studentId: string | null
    createdAt: Date | null
    relationshipType: string | null
  }

  export type ParentStudentRelationshipCountAggregateOutputType = {
    id: number
    parentId: number
    studentId: number
    createdAt: number
    relationshipType: number
    _all: number
  }


  export type ParentStudentRelationshipMinAggregateInputType = {
    id?: true
    parentId?: true
    studentId?: true
    createdAt?: true
    relationshipType?: true
  }

  export type ParentStudentRelationshipMaxAggregateInputType = {
    id?: true
    parentId?: true
    studentId?: true
    createdAt?: true
    relationshipType?: true
  }

  export type ParentStudentRelationshipCountAggregateInputType = {
    id?: true
    parentId?: true
    studentId?: true
    createdAt?: true
    relationshipType?: true
    _all?: true
  }

  export type ParentStudentRelationshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentStudentRelationship to aggregate.
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudentRelationships to fetch.
     */
    orderBy?: ParentStudentRelationshipOrderByWithRelationInput | ParentStudentRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentStudentRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudentRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudentRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParentStudentRelationships
    **/
    _count?: true | ParentStudentRelationshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentStudentRelationshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentStudentRelationshipMaxAggregateInputType
  }

  export type GetParentStudentRelationshipAggregateType<T extends ParentStudentRelationshipAggregateArgs> = {
        [P in keyof T & keyof AggregateParentStudentRelationship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParentStudentRelationship[P]>
      : GetScalarType<T[P], AggregateParentStudentRelationship[P]>
  }




  export type ParentStudentRelationshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentStudentRelationshipWhereInput
    orderBy?: ParentStudentRelationshipOrderByWithAggregationInput | ParentStudentRelationshipOrderByWithAggregationInput[]
    by: ParentStudentRelationshipScalarFieldEnum[] | ParentStudentRelationshipScalarFieldEnum
    having?: ParentStudentRelationshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentStudentRelationshipCountAggregateInputType | true
    _min?: ParentStudentRelationshipMinAggregateInputType
    _max?: ParentStudentRelationshipMaxAggregateInputType
  }

  export type ParentStudentRelationshipGroupByOutputType = {
    id: string
    parentId: string
    studentId: string
    createdAt: Date
    relationshipType: string | null
    _count: ParentStudentRelationshipCountAggregateOutputType | null
    _min: ParentStudentRelationshipMinAggregateOutputType | null
    _max: ParentStudentRelationshipMaxAggregateOutputType | null
  }

  type GetParentStudentRelationshipGroupByPayload<T extends ParentStudentRelationshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentStudentRelationshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentStudentRelationshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentStudentRelationshipGroupByOutputType[P]>
            : GetScalarType<T[P], ParentStudentRelationshipGroupByOutputType[P]>
        }
      >
    >


  export type ParentStudentRelationshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    studentId?: boolean
    createdAt?: boolean
    relationshipType?: boolean
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    notifications?: boolean | ParentStudentRelationship$notificationsArgs<ExtArgs>
    _count?: boolean | ParentStudentRelationshipCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentStudentRelationship"]>

  export type ParentStudentRelationshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    studentId?: boolean
    createdAt?: boolean
    relationshipType?: boolean
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentStudentRelationship"]>

  export type ParentStudentRelationshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    studentId?: boolean
    createdAt?: boolean
    relationshipType?: boolean
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentStudentRelationship"]>

  export type ParentStudentRelationshipSelectScalar = {
    id?: boolean
    parentId?: boolean
    studentId?: boolean
    createdAt?: boolean
    relationshipType?: boolean
  }

  export type ParentStudentRelationshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parentId" | "studentId" | "createdAt" | "relationshipType", ExtArgs["result"]["parentStudentRelationship"]>
  export type ParentStudentRelationshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    notifications?: boolean | ParentStudentRelationship$notificationsArgs<ExtArgs>
    _count?: boolean | ParentStudentRelationshipCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParentStudentRelationshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ParentStudentRelationshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ParentStudentRelationshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParentStudentRelationship"
    objects: {
      parent: Prisma.$ProfilePayload<ExtArgs>
      student: Prisma.$ProfilePayload<ExtArgs>
      notifications: Prisma.$ParentNotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      parentId: string
      studentId: string
      createdAt: Date
      relationshipType: string | null
    }, ExtArgs["result"]["parentStudentRelationship"]>
    composites: {}
  }

  type ParentStudentRelationshipGetPayload<S extends boolean | null | undefined | ParentStudentRelationshipDefaultArgs> = $Result.GetResult<Prisma.$ParentStudentRelationshipPayload, S>

  type ParentStudentRelationshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParentStudentRelationshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParentStudentRelationshipCountAggregateInputType | true
    }

  export interface ParentStudentRelationshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParentStudentRelationship'], meta: { name: 'ParentStudentRelationship' } }
    /**
     * Find zero or one ParentStudentRelationship that matches the filter.
     * @param {ParentStudentRelationshipFindUniqueArgs} args - Arguments to find a ParentStudentRelationship
     * @example
     * // Get one ParentStudentRelationship
     * const parentStudentRelationship = await prisma.parentStudentRelationship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentStudentRelationshipFindUniqueArgs>(args: SelectSubset<T, ParentStudentRelationshipFindUniqueArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParentStudentRelationship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentStudentRelationshipFindUniqueOrThrowArgs} args - Arguments to find a ParentStudentRelationship
     * @example
     * // Get one ParentStudentRelationship
     * const parentStudentRelationship = await prisma.parentStudentRelationship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentStudentRelationshipFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentStudentRelationshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentStudentRelationship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipFindFirstArgs} args - Arguments to find a ParentStudentRelationship
     * @example
     * // Get one ParentStudentRelationship
     * const parentStudentRelationship = await prisma.parentStudentRelationship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentStudentRelationshipFindFirstArgs>(args?: SelectSubset<T, ParentStudentRelationshipFindFirstArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentStudentRelationship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipFindFirstOrThrowArgs} args - Arguments to find a ParentStudentRelationship
     * @example
     * // Get one ParentStudentRelationship
     * const parentStudentRelationship = await prisma.parentStudentRelationship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentStudentRelationshipFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentStudentRelationshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParentStudentRelationships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentStudentRelationships
     * const parentStudentRelationships = await prisma.parentStudentRelationship.findMany()
     * 
     * // Get first 10 ParentStudentRelationships
     * const parentStudentRelationships = await prisma.parentStudentRelationship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parentStudentRelationshipWithIdOnly = await prisma.parentStudentRelationship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParentStudentRelationshipFindManyArgs>(args?: SelectSubset<T, ParentStudentRelationshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParentStudentRelationship.
     * @param {ParentStudentRelationshipCreateArgs} args - Arguments to create a ParentStudentRelationship.
     * @example
     * // Create one ParentStudentRelationship
     * const ParentStudentRelationship = await prisma.parentStudentRelationship.create({
     *   data: {
     *     // ... data to create a ParentStudentRelationship
     *   }
     * })
     * 
     */
    create<T extends ParentStudentRelationshipCreateArgs>(args: SelectSubset<T, ParentStudentRelationshipCreateArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParentStudentRelationships.
     * @param {ParentStudentRelationshipCreateManyArgs} args - Arguments to create many ParentStudentRelationships.
     * @example
     * // Create many ParentStudentRelationships
     * const parentStudentRelationship = await prisma.parentStudentRelationship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentStudentRelationshipCreateManyArgs>(args?: SelectSubset<T, ParentStudentRelationshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParentStudentRelationships and returns the data saved in the database.
     * @param {ParentStudentRelationshipCreateManyAndReturnArgs} args - Arguments to create many ParentStudentRelationships.
     * @example
     * // Create many ParentStudentRelationships
     * const parentStudentRelationship = await prisma.parentStudentRelationship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParentStudentRelationships and only return the `id`
     * const parentStudentRelationshipWithIdOnly = await prisma.parentStudentRelationship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParentStudentRelationshipCreateManyAndReturnArgs>(args?: SelectSubset<T, ParentStudentRelationshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParentStudentRelationship.
     * @param {ParentStudentRelationshipDeleteArgs} args - Arguments to delete one ParentStudentRelationship.
     * @example
     * // Delete one ParentStudentRelationship
     * const ParentStudentRelationship = await prisma.parentStudentRelationship.delete({
     *   where: {
     *     // ... filter to delete one ParentStudentRelationship
     *   }
     * })
     * 
     */
    delete<T extends ParentStudentRelationshipDeleteArgs>(args: SelectSubset<T, ParentStudentRelationshipDeleteArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParentStudentRelationship.
     * @param {ParentStudentRelationshipUpdateArgs} args - Arguments to update one ParentStudentRelationship.
     * @example
     * // Update one ParentStudentRelationship
     * const parentStudentRelationship = await prisma.parentStudentRelationship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentStudentRelationshipUpdateArgs>(args: SelectSubset<T, ParentStudentRelationshipUpdateArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParentStudentRelationships.
     * @param {ParentStudentRelationshipDeleteManyArgs} args - Arguments to filter ParentStudentRelationships to delete.
     * @example
     * // Delete a few ParentStudentRelationships
     * const { count } = await prisma.parentStudentRelationship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentStudentRelationshipDeleteManyArgs>(args?: SelectSubset<T, ParentStudentRelationshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentStudentRelationships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentStudentRelationships
     * const parentStudentRelationship = await prisma.parentStudentRelationship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentStudentRelationshipUpdateManyArgs>(args: SelectSubset<T, ParentStudentRelationshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentStudentRelationships and returns the data updated in the database.
     * @param {ParentStudentRelationshipUpdateManyAndReturnArgs} args - Arguments to update many ParentStudentRelationships.
     * @example
     * // Update many ParentStudentRelationships
     * const parentStudentRelationship = await prisma.parentStudentRelationship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParentStudentRelationships and only return the `id`
     * const parentStudentRelationshipWithIdOnly = await prisma.parentStudentRelationship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParentStudentRelationshipUpdateManyAndReturnArgs>(args: SelectSubset<T, ParentStudentRelationshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParentStudentRelationship.
     * @param {ParentStudentRelationshipUpsertArgs} args - Arguments to update or create a ParentStudentRelationship.
     * @example
     * // Update or create a ParentStudentRelationship
     * const parentStudentRelationship = await prisma.parentStudentRelationship.upsert({
     *   create: {
     *     // ... data to create a ParentStudentRelationship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentStudentRelationship we want to update
     *   }
     * })
     */
    upsert<T extends ParentStudentRelationshipUpsertArgs>(args: SelectSubset<T, ParentStudentRelationshipUpsertArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParentStudentRelationships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipCountArgs} args - Arguments to filter ParentStudentRelationships to count.
     * @example
     * // Count the number of ParentStudentRelationships
     * const count = await prisma.parentStudentRelationship.count({
     *   where: {
     *     // ... the filter for the ParentStudentRelationships we want to count
     *   }
     * })
    **/
    count<T extends ParentStudentRelationshipCountArgs>(
      args?: Subset<T, ParentStudentRelationshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentStudentRelationshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParentStudentRelationship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParentStudentRelationshipAggregateArgs>(args: Subset<T, ParentStudentRelationshipAggregateArgs>): Prisma.PrismaPromise<GetParentStudentRelationshipAggregateType<T>>

    /**
     * Group by ParentStudentRelationship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentRelationshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParentStudentRelationshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentStudentRelationshipGroupByArgs['orderBy'] }
        : { orderBy?: ParentStudentRelationshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParentStudentRelationshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentStudentRelationshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParentStudentRelationship model
   */
  readonly fields: ParentStudentRelationshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParentStudentRelationship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentStudentRelationshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notifications<T extends ParentStudentRelationship$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, ParentStudentRelationship$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParentStudentRelationship model
   */
  interface ParentStudentRelationshipFieldRefs {
    readonly id: FieldRef<"ParentStudentRelationship", 'String'>
    readonly parentId: FieldRef<"ParentStudentRelationship", 'String'>
    readonly studentId: FieldRef<"ParentStudentRelationship", 'String'>
    readonly createdAt: FieldRef<"ParentStudentRelationship", 'DateTime'>
    readonly relationshipType: FieldRef<"ParentStudentRelationship", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ParentStudentRelationship findUnique
   */
  export type ParentStudentRelationshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudentRelationship to fetch.
     */
    where: ParentStudentRelationshipWhereUniqueInput
  }

  /**
   * ParentStudentRelationship findUniqueOrThrow
   */
  export type ParentStudentRelationshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudentRelationship to fetch.
     */
    where: ParentStudentRelationshipWhereUniqueInput
  }

  /**
   * ParentStudentRelationship findFirst
   */
  export type ParentStudentRelationshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudentRelationship to fetch.
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudentRelationships to fetch.
     */
    orderBy?: ParentStudentRelationshipOrderByWithRelationInput | ParentStudentRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentStudentRelationships.
     */
    cursor?: ParentStudentRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudentRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudentRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentStudentRelationships.
     */
    distinct?: ParentStudentRelationshipScalarFieldEnum | ParentStudentRelationshipScalarFieldEnum[]
  }

  /**
   * ParentStudentRelationship findFirstOrThrow
   */
  export type ParentStudentRelationshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudentRelationship to fetch.
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudentRelationships to fetch.
     */
    orderBy?: ParentStudentRelationshipOrderByWithRelationInput | ParentStudentRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentStudentRelationships.
     */
    cursor?: ParentStudentRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudentRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudentRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentStudentRelationships.
     */
    distinct?: ParentStudentRelationshipScalarFieldEnum | ParentStudentRelationshipScalarFieldEnum[]
  }

  /**
   * ParentStudentRelationship findMany
   */
  export type ParentStudentRelationshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudentRelationships to fetch.
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudentRelationships to fetch.
     */
    orderBy?: ParentStudentRelationshipOrderByWithRelationInput | ParentStudentRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParentStudentRelationships.
     */
    cursor?: ParentStudentRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudentRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudentRelationships.
     */
    skip?: number
    distinct?: ParentStudentRelationshipScalarFieldEnum | ParentStudentRelationshipScalarFieldEnum[]
  }

  /**
   * ParentStudentRelationship create
   */
  export type ParentStudentRelationshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * The data needed to create a ParentStudentRelationship.
     */
    data: XOR<ParentStudentRelationshipCreateInput, ParentStudentRelationshipUncheckedCreateInput>
  }

  /**
   * ParentStudentRelationship createMany
   */
  export type ParentStudentRelationshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentStudentRelationships.
     */
    data: ParentStudentRelationshipCreateManyInput | ParentStudentRelationshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParentStudentRelationship createManyAndReturn
   */
  export type ParentStudentRelationshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * The data used to create many ParentStudentRelationships.
     */
    data: ParentStudentRelationshipCreateManyInput | ParentStudentRelationshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentStudentRelationship update
   */
  export type ParentStudentRelationshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * The data needed to update a ParentStudentRelationship.
     */
    data: XOR<ParentStudentRelationshipUpdateInput, ParentStudentRelationshipUncheckedUpdateInput>
    /**
     * Choose, which ParentStudentRelationship to update.
     */
    where: ParentStudentRelationshipWhereUniqueInput
  }

  /**
   * ParentStudentRelationship updateMany
   */
  export type ParentStudentRelationshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentStudentRelationships.
     */
    data: XOR<ParentStudentRelationshipUpdateManyMutationInput, ParentStudentRelationshipUncheckedUpdateManyInput>
    /**
     * Filter which ParentStudentRelationships to update
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * Limit how many ParentStudentRelationships to update.
     */
    limit?: number
  }

  /**
   * ParentStudentRelationship updateManyAndReturn
   */
  export type ParentStudentRelationshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * The data used to update ParentStudentRelationships.
     */
    data: XOR<ParentStudentRelationshipUpdateManyMutationInput, ParentStudentRelationshipUncheckedUpdateManyInput>
    /**
     * Filter which ParentStudentRelationships to update
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * Limit how many ParentStudentRelationships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentStudentRelationship upsert
   */
  export type ParentStudentRelationshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * The filter to search for the ParentStudentRelationship to update in case it exists.
     */
    where: ParentStudentRelationshipWhereUniqueInput
    /**
     * In case the ParentStudentRelationship found by the `where` argument doesn't exist, create a new ParentStudentRelationship with this data.
     */
    create: XOR<ParentStudentRelationshipCreateInput, ParentStudentRelationshipUncheckedCreateInput>
    /**
     * In case the ParentStudentRelationship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentStudentRelationshipUpdateInput, ParentStudentRelationshipUncheckedUpdateInput>
  }

  /**
   * ParentStudentRelationship delete
   */
  export type ParentStudentRelationshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
    /**
     * Filter which ParentStudentRelationship to delete.
     */
    where: ParentStudentRelationshipWhereUniqueInput
  }

  /**
   * ParentStudentRelationship deleteMany
   */
  export type ParentStudentRelationshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentStudentRelationships to delete
     */
    where?: ParentStudentRelationshipWhereInput
    /**
     * Limit how many ParentStudentRelationships to delete.
     */
    limit?: number
  }

  /**
   * ParentStudentRelationship.notifications
   */
  export type ParentStudentRelationship$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    where?: ParentNotificationWhereInput
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    cursor?: ParentNotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentNotificationScalarFieldEnum | ParentNotificationScalarFieldEnum[]
  }

  /**
   * ParentStudentRelationship without action
   */
  export type ParentStudentRelationshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudentRelationship
     */
    select?: ParentStudentRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudentRelationship
     */
    omit?: ParentStudentRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentRelationshipInclude<ExtArgs> | null
  }


  /**
   * Model ParentNotification
   */

  export type AggregateParentNotification = {
    _count: ParentNotificationCountAggregateOutputType | null
    _min: ParentNotificationMinAggregateOutputType | null
    _max: ParentNotificationMaxAggregateOutputType | null
  }

  export type ParentNotificationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    parentId: string | null
    studentId: string | null
    type: $Enums.NotificationType | null
    content: string | null
    isRead: boolean | null
    referenceId: string | null
  }

  export type ParentNotificationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    parentId: string | null
    studentId: string | null
    type: $Enums.NotificationType | null
    content: string | null
    isRead: boolean | null
    referenceId: string | null
  }

  export type ParentNotificationCountAggregateOutputType = {
    id: number
    createdAt: number
    parentId: number
    studentId: number
    type: number
    content: number
    isRead: number
    referenceId: number
    _all: number
  }


  export type ParentNotificationMinAggregateInputType = {
    id?: true
    createdAt?: true
    parentId?: true
    studentId?: true
    type?: true
    content?: true
    isRead?: true
    referenceId?: true
  }

  export type ParentNotificationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    parentId?: true
    studentId?: true
    type?: true
    content?: true
    isRead?: true
    referenceId?: true
  }

  export type ParentNotificationCountAggregateInputType = {
    id?: true
    createdAt?: true
    parentId?: true
    studentId?: true
    type?: true
    content?: true
    isRead?: true
    referenceId?: true
    _all?: true
  }

  export type ParentNotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentNotification to aggregate.
     */
    where?: ParentNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentNotifications to fetch.
     */
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParentNotifications
    **/
    _count?: true | ParentNotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentNotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentNotificationMaxAggregateInputType
  }

  export type GetParentNotificationAggregateType<T extends ParentNotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateParentNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParentNotification[P]>
      : GetScalarType<T[P], AggregateParentNotification[P]>
  }




  export type ParentNotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentNotificationWhereInput
    orderBy?: ParentNotificationOrderByWithAggregationInput | ParentNotificationOrderByWithAggregationInput[]
    by: ParentNotificationScalarFieldEnum[] | ParentNotificationScalarFieldEnum
    having?: ParentNotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentNotificationCountAggregateInputType | true
    _min?: ParentNotificationMinAggregateInputType
    _max?: ParentNotificationMaxAggregateInputType
  }

  export type ParentNotificationGroupByOutputType = {
    id: string
    createdAt: Date
    parentId: string
    studentId: string
    type: $Enums.NotificationType
    content: string
    isRead: boolean
    referenceId: string | null
    _count: ParentNotificationCountAggregateOutputType | null
    _min: ParentNotificationMinAggregateOutputType | null
    _max: ParentNotificationMaxAggregateOutputType | null
  }

  type GetParentNotificationGroupByPayload<T extends ParentNotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentNotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentNotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentNotificationGroupByOutputType[P]>
            : GetScalarType<T[P], ParentNotificationGroupByOutputType[P]>
        }
      >
    >


  export type ParentNotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    parentId?: boolean
    studentId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    referenceId?: boolean
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    relationship?: boolean | ParentStudentRelationshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentNotification"]>

  export type ParentNotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    parentId?: boolean
    studentId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    referenceId?: boolean
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    relationship?: boolean | ParentStudentRelationshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentNotification"]>

  export type ParentNotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    parentId?: boolean
    studentId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    referenceId?: boolean
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    relationship?: boolean | ParentStudentRelationshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentNotification"]>

  export type ParentNotificationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    parentId?: boolean
    studentId?: boolean
    type?: boolean
    content?: boolean
    isRead?: boolean
    referenceId?: boolean
  }

  export type ParentNotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "parentId" | "studentId" | "type" | "content" | "isRead" | "referenceId", ExtArgs["result"]["parentNotification"]>
  export type ParentNotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    relationship?: boolean | ParentStudentRelationshipDefaultArgs<ExtArgs>
  }
  export type ParentNotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    relationship?: boolean | ParentStudentRelationshipDefaultArgs<ExtArgs>
  }
  export type ParentNotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | ProfileDefaultArgs<ExtArgs>
    student?: boolean | ProfileDefaultArgs<ExtArgs>
    relationship?: boolean | ParentStudentRelationshipDefaultArgs<ExtArgs>
  }

  export type $ParentNotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParentNotification"
    objects: {
      parent: Prisma.$ProfilePayload<ExtArgs>
      student: Prisma.$ProfilePayload<ExtArgs>
      relationship: Prisma.$ParentStudentRelationshipPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      parentId: string
      studentId: string
      type: $Enums.NotificationType
      content: string
      isRead: boolean
      referenceId: string | null
    }, ExtArgs["result"]["parentNotification"]>
    composites: {}
  }

  type ParentNotificationGetPayload<S extends boolean | null | undefined | ParentNotificationDefaultArgs> = $Result.GetResult<Prisma.$ParentNotificationPayload, S>

  type ParentNotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParentNotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParentNotificationCountAggregateInputType | true
    }

  export interface ParentNotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParentNotification'], meta: { name: 'ParentNotification' } }
    /**
     * Find zero or one ParentNotification that matches the filter.
     * @param {ParentNotificationFindUniqueArgs} args - Arguments to find a ParentNotification
     * @example
     * // Get one ParentNotification
     * const parentNotification = await prisma.parentNotification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentNotificationFindUniqueArgs>(args: SelectSubset<T, ParentNotificationFindUniqueArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParentNotification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentNotificationFindUniqueOrThrowArgs} args - Arguments to find a ParentNotification
     * @example
     * // Get one ParentNotification
     * const parentNotification = await prisma.parentNotification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentNotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentNotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentNotification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationFindFirstArgs} args - Arguments to find a ParentNotification
     * @example
     * // Get one ParentNotification
     * const parentNotification = await prisma.parentNotification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentNotificationFindFirstArgs>(args?: SelectSubset<T, ParentNotificationFindFirstArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentNotification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationFindFirstOrThrowArgs} args - Arguments to find a ParentNotification
     * @example
     * // Get one ParentNotification
     * const parentNotification = await prisma.parentNotification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentNotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentNotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParentNotifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentNotifications
     * const parentNotifications = await prisma.parentNotification.findMany()
     * 
     * // Get first 10 ParentNotifications
     * const parentNotifications = await prisma.parentNotification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parentNotificationWithIdOnly = await prisma.parentNotification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParentNotificationFindManyArgs>(args?: SelectSubset<T, ParentNotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParentNotification.
     * @param {ParentNotificationCreateArgs} args - Arguments to create a ParentNotification.
     * @example
     * // Create one ParentNotification
     * const ParentNotification = await prisma.parentNotification.create({
     *   data: {
     *     // ... data to create a ParentNotification
     *   }
     * })
     * 
     */
    create<T extends ParentNotificationCreateArgs>(args: SelectSubset<T, ParentNotificationCreateArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParentNotifications.
     * @param {ParentNotificationCreateManyArgs} args - Arguments to create many ParentNotifications.
     * @example
     * // Create many ParentNotifications
     * const parentNotification = await prisma.parentNotification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentNotificationCreateManyArgs>(args?: SelectSubset<T, ParentNotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParentNotifications and returns the data saved in the database.
     * @param {ParentNotificationCreateManyAndReturnArgs} args - Arguments to create many ParentNotifications.
     * @example
     * // Create many ParentNotifications
     * const parentNotification = await prisma.parentNotification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParentNotifications and only return the `id`
     * const parentNotificationWithIdOnly = await prisma.parentNotification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParentNotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, ParentNotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParentNotification.
     * @param {ParentNotificationDeleteArgs} args - Arguments to delete one ParentNotification.
     * @example
     * // Delete one ParentNotification
     * const ParentNotification = await prisma.parentNotification.delete({
     *   where: {
     *     // ... filter to delete one ParentNotification
     *   }
     * })
     * 
     */
    delete<T extends ParentNotificationDeleteArgs>(args: SelectSubset<T, ParentNotificationDeleteArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParentNotification.
     * @param {ParentNotificationUpdateArgs} args - Arguments to update one ParentNotification.
     * @example
     * // Update one ParentNotification
     * const parentNotification = await prisma.parentNotification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentNotificationUpdateArgs>(args: SelectSubset<T, ParentNotificationUpdateArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParentNotifications.
     * @param {ParentNotificationDeleteManyArgs} args - Arguments to filter ParentNotifications to delete.
     * @example
     * // Delete a few ParentNotifications
     * const { count } = await prisma.parentNotification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentNotificationDeleteManyArgs>(args?: SelectSubset<T, ParentNotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentNotifications
     * const parentNotification = await prisma.parentNotification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentNotificationUpdateManyArgs>(args: SelectSubset<T, ParentNotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentNotifications and returns the data updated in the database.
     * @param {ParentNotificationUpdateManyAndReturnArgs} args - Arguments to update many ParentNotifications.
     * @example
     * // Update many ParentNotifications
     * const parentNotification = await prisma.parentNotification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParentNotifications and only return the `id`
     * const parentNotificationWithIdOnly = await prisma.parentNotification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParentNotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, ParentNotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParentNotification.
     * @param {ParentNotificationUpsertArgs} args - Arguments to update or create a ParentNotification.
     * @example
     * // Update or create a ParentNotification
     * const parentNotification = await prisma.parentNotification.upsert({
     *   create: {
     *     // ... data to create a ParentNotification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentNotification we want to update
     *   }
     * })
     */
    upsert<T extends ParentNotificationUpsertArgs>(args: SelectSubset<T, ParentNotificationUpsertArgs<ExtArgs>>): Prisma__ParentNotificationClient<$Result.GetResult<Prisma.$ParentNotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParentNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationCountArgs} args - Arguments to filter ParentNotifications to count.
     * @example
     * // Count the number of ParentNotifications
     * const count = await prisma.parentNotification.count({
     *   where: {
     *     // ... the filter for the ParentNotifications we want to count
     *   }
     * })
    **/
    count<T extends ParentNotificationCountArgs>(
      args?: Subset<T, ParentNotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentNotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParentNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParentNotificationAggregateArgs>(args: Subset<T, ParentNotificationAggregateArgs>): Prisma.PrismaPromise<GetParentNotificationAggregateType<T>>

    /**
     * Group by ParentNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentNotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParentNotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentNotificationGroupByArgs['orderBy'] }
        : { orderBy?: ParentNotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParentNotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParentNotification model
   */
  readonly fields: ParentNotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParentNotification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentNotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    relationship<T extends ParentStudentRelationshipDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParentStudentRelationshipDefaultArgs<ExtArgs>>): Prisma__ParentStudentRelationshipClient<$Result.GetResult<Prisma.$ParentStudentRelationshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParentNotification model
   */
  interface ParentNotificationFieldRefs {
    readonly id: FieldRef<"ParentNotification", 'String'>
    readonly createdAt: FieldRef<"ParentNotification", 'DateTime'>
    readonly parentId: FieldRef<"ParentNotification", 'String'>
    readonly studentId: FieldRef<"ParentNotification", 'String'>
    readonly type: FieldRef<"ParentNotification", 'NotificationType'>
    readonly content: FieldRef<"ParentNotification", 'String'>
    readonly isRead: FieldRef<"ParentNotification", 'Boolean'>
    readonly referenceId: FieldRef<"ParentNotification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ParentNotification findUnique
   */
  export type ParentNotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * Filter, which ParentNotification to fetch.
     */
    where: ParentNotificationWhereUniqueInput
  }

  /**
   * ParentNotification findUniqueOrThrow
   */
  export type ParentNotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * Filter, which ParentNotification to fetch.
     */
    where: ParentNotificationWhereUniqueInput
  }

  /**
   * ParentNotification findFirst
   */
  export type ParentNotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * Filter, which ParentNotification to fetch.
     */
    where?: ParentNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentNotifications to fetch.
     */
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentNotifications.
     */
    cursor?: ParentNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentNotifications.
     */
    distinct?: ParentNotificationScalarFieldEnum | ParentNotificationScalarFieldEnum[]
  }

  /**
   * ParentNotification findFirstOrThrow
   */
  export type ParentNotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * Filter, which ParentNotification to fetch.
     */
    where?: ParentNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentNotifications to fetch.
     */
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentNotifications.
     */
    cursor?: ParentNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentNotifications.
     */
    distinct?: ParentNotificationScalarFieldEnum | ParentNotificationScalarFieldEnum[]
  }

  /**
   * ParentNotification findMany
   */
  export type ParentNotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * Filter, which ParentNotifications to fetch.
     */
    where?: ParentNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentNotifications to fetch.
     */
    orderBy?: ParentNotificationOrderByWithRelationInput | ParentNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParentNotifications.
     */
    cursor?: ParentNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentNotifications.
     */
    skip?: number
    distinct?: ParentNotificationScalarFieldEnum | ParentNotificationScalarFieldEnum[]
  }

  /**
   * ParentNotification create
   */
  export type ParentNotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a ParentNotification.
     */
    data: XOR<ParentNotificationCreateInput, ParentNotificationUncheckedCreateInput>
  }

  /**
   * ParentNotification createMany
   */
  export type ParentNotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentNotifications.
     */
    data: ParentNotificationCreateManyInput | ParentNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParentNotification createManyAndReturn
   */
  export type ParentNotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * The data used to create many ParentNotifications.
     */
    data: ParentNotificationCreateManyInput | ParentNotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentNotification update
   */
  export type ParentNotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a ParentNotification.
     */
    data: XOR<ParentNotificationUpdateInput, ParentNotificationUncheckedUpdateInput>
    /**
     * Choose, which ParentNotification to update.
     */
    where: ParentNotificationWhereUniqueInput
  }

  /**
   * ParentNotification updateMany
   */
  export type ParentNotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentNotifications.
     */
    data: XOR<ParentNotificationUpdateManyMutationInput, ParentNotificationUncheckedUpdateManyInput>
    /**
     * Filter which ParentNotifications to update
     */
    where?: ParentNotificationWhereInput
    /**
     * Limit how many ParentNotifications to update.
     */
    limit?: number
  }

  /**
   * ParentNotification updateManyAndReturn
   */
  export type ParentNotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * The data used to update ParentNotifications.
     */
    data: XOR<ParentNotificationUpdateManyMutationInput, ParentNotificationUncheckedUpdateManyInput>
    /**
     * Filter which ParentNotifications to update
     */
    where?: ParentNotificationWhereInput
    /**
     * Limit how many ParentNotifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentNotification upsert
   */
  export type ParentNotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the ParentNotification to update in case it exists.
     */
    where: ParentNotificationWhereUniqueInput
    /**
     * In case the ParentNotification found by the `where` argument doesn't exist, create a new ParentNotification with this data.
     */
    create: XOR<ParentNotificationCreateInput, ParentNotificationUncheckedCreateInput>
    /**
     * In case the ParentNotification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentNotificationUpdateInput, ParentNotificationUncheckedUpdateInput>
  }

  /**
   * ParentNotification delete
   */
  export type ParentNotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
    /**
     * Filter which ParentNotification to delete.
     */
    where: ParentNotificationWhereUniqueInput
  }

  /**
   * ParentNotification deleteMany
   */
  export type ParentNotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentNotifications to delete
     */
    where?: ParentNotificationWhereInput
    /**
     * Limit how many ParentNotifications to delete.
     */
    limit?: number
  }

  /**
   * ParentNotification without action
   */
  export type ParentNotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentNotification
     */
    select?: ParentNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentNotification
     */
    omit?: ParentNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentNotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    updatedAt: 'updatedAt',
    username: 'username',
    fullName: 'fullName',
    avatarUrl: 'avatarUrl',
    email: 'email',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    name: 'name',
    description: 'description',
    teacherId: 'teacherId',
    imageUrl: 'imageUrl'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    studentId: 'studentId',
    classId: 'classId'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const AssignmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    title: 'title',
    description: 'description',
    dueDate: 'dueDate',
    classId: 'classId',
    points: 'points'
  };

  export type AssignmentScalarFieldEnum = (typeof AssignmentScalarFieldEnum)[keyof typeof AssignmentScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    studentId: 'studentId',
    assignmentId: 'assignmentId',
    content: 'content',
    fileUrl: 'fileUrl',
    grade: 'grade',
    feedback: 'feedback',
    isGraded: 'isGraded'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    title: 'title',
    content: 'content',
    authorId: 'authorId',
    classId: 'classId'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const ParentStudentRelationshipScalarFieldEnum: {
    id: 'id',
    parentId: 'parentId',
    studentId: 'studentId',
    createdAt: 'createdAt',
    relationshipType: 'relationshipType'
  };

  export type ParentStudentRelationshipScalarFieldEnum = (typeof ParentStudentRelationshipScalarFieldEnum)[keyof typeof ParentStudentRelationshipScalarFieldEnum]


  export const ParentNotificationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    parentId: 'parentId',
    studentId: 'studentId',
    type: 'type',
    content: 'content',
    isRead: 'isRead',
    referenceId: 'referenceId'
  };

  export type ParentNotificationScalarFieldEnum = (typeof ParentNotificationScalarFieldEnum)[keyof typeof ParentNotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: UuidFilter<"Profile"> | string
    updatedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    username?: StringNullableFilter<"Profile"> | string | null
    fullName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    role?: EnumRoleFilter<"Profile"> | $Enums.Role
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    teacherClasses?: ClassListRelationFilter
    studentEnrollments?: EnrollmentListRelationFilter
    authorAnnouncements?: AnnouncementListRelationFilter
    studentSubmissions?: SubmissionListRelationFilter
    asParent?: ParentStudentRelationshipListRelationFilter
    asStudent?: ParentStudentRelationshipListRelationFilter
    parentNotifications?: ParentNotificationListRelationFilter
    studentNotifications?: ParentNotificationListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    teacherClasses?: ClassOrderByRelationAggregateInput
    studentEnrollments?: EnrollmentOrderByRelationAggregateInput
    authorAnnouncements?: AnnouncementOrderByRelationAggregateInput
    studentSubmissions?: SubmissionOrderByRelationAggregateInput
    asParent?: ParentStudentRelationshipOrderByRelationAggregateInput
    asStudent?: ParentStudentRelationshipOrderByRelationAggregateInput
    parentNotifications?: ParentNotificationOrderByRelationAggregateInput
    studentNotifications?: ParentNotificationOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    updatedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    fullName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    role?: EnumRoleFilter<"Profile"> | $Enums.Role
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    teacherClasses?: ClassListRelationFilter
    studentEnrollments?: EnrollmentListRelationFilter
    authorAnnouncements?: AnnouncementListRelationFilter
    studentSubmissions?: SubmissionListRelationFilter
    asParent?: ParentStudentRelationshipListRelationFilter
    asStudent?: ParentStudentRelationshipListRelationFilter
    parentNotifications?: ParentNotificationListRelationFilter
    studentNotifications?: ParentNotificationListRelationFilter
  }, "id" | "username">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Profile"> | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    username?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    email?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    role?: EnumRoleWithAggregatesFilter<"Profile"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: UuidFilter<"Class"> | string
    createdAt?: DateTimeFilter<"Class"> | Date | string
    name?: StringFilter<"Class"> | string
    description?: StringNullableFilter<"Class"> | string | null
    teacherId?: UuidNullableFilter<"Class"> | string | null
    imageUrl?: StringNullableFilter<"Class"> | string | null
    teacher?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    enrollments?: EnrollmentListRelationFilter
    assignments?: AssignmentListRelationFilter
    announcements?: AnnouncementListRelationFilter
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    teacher?: ProfileOrderByWithRelationInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    assignments?: AssignmentOrderByRelationAggregateInput
    announcements?: AnnouncementOrderByRelationAggregateInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    createdAt?: DateTimeFilter<"Class"> | Date | string
    name?: StringFilter<"Class"> | string
    description?: StringNullableFilter<"Class"> | string | null
    teacherId?: UuidNullableFilter<"Class"> | string | null
    imageUrl?: StringNullableFilter<"Class"> | string | null
    teacher?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    enrollments?: EnrollmentListRelationFilter
    assignments?: AssignmentListRelationFilter
    announcements?: AnnouncementListRelationFilter
  }, "id">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    _count?: ClassCountOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Class"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
    name?: StringWithAggregatesFilter<"Class"> | string
    description?: StringNullableWithAggregatesFilter<"Class"> | string | null
    teacherId?: UuidNullableWithAggregatesFilter<"Class"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Class"> | string | null
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: UuidFilter<"Enrollment"> | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    studentId?: UuidFilter<"Enrollment"> | string
    classId?: UuidFilter<"Enrollment"> | string
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    student?: ProfileOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_classId?: EnrollmentStudentIdClassIdCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    studentId?: UuidFilter<"Enrollment"> | string
    classId?: UuidFilter<"Enrollment"> | string
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }, "id" | "studentId_classId">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Enrollment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    studentId?: UuidWithAggregatesFilter<"Enrollment"> | string
    classId?: UuidWithAggregatesFilter<"Enrollment"> | string
  }

  export type AssignmentWhereInput = {
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    id?: UuidFilter<"Assignment"> | string
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    title?: StringFilter<"Assignment"> | string
    description?: StringNullableFilter<"Assignment"> | string | null
    dueDate?: DateTimeFilter<"Assignment"> | Date | string
    classId?: UuidFilter<"Assignment"> | string
    points?: IntFilter<"Assignment"> | number
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    submissions?: SubmissionListRelationFilter
  }

  export type AssignmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueDate?: SortOrder
    classId?: SortOrder
    points?: SortOrder
    class?: ClassOrderByWithRelationInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type AssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    title?: StringFilter<"Assignment"> | string
    description?: StringNullableFilter<"Assignment"> | string | null
    dueDate?: DateTimeFilter<"Assignment"> | Date | string
    classId?: UuidFilter<"Assignment"> | string
    points?: IntFilter<"Assignment"> | number
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    submissions?: SubmissionListRelationFilter
  }, "id">

  export type AssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueDate?: SortOrder
    classId?: SortOrder
    points?: SortOrder
    _count?: AssignmentCountOrderByAggregateInput
    _avg?: AssignmentAvgOrderByAggregateInput
    _max?: AssignmentMaxOrderByAggregateInput
    _min?: AssignmentMinOrderByAggregateInput
    _sum?: AssignmentSumOrderByAggregateInput
  }

  export type AssignmentScalarWhereWithAggregatesInput = {
    AND?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    OR?: AssignmentScalarWhereWithAggregatesInput[]
    NOT?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Assignment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
    title?: StringWithAggregatesFilter<"Assignment"> | string
    description?: StringNullableWithAggregatesFilter<"Assignment"> | string | null
    dueDate?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
    classId?: UuidWithAggregatesFilter<"Assignment"> | string
    points?: IntWithAggregatesFilter<"Assignment"> | number
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: UuidFilter<"Submission"> | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    studentId?: UuidFilter<"Submission"> | string
    assignmentId?: UuidFilter<"Submission"> | string
    content?: StringNullableFilter<"Submission"> | string | null
    fileUrl?: StringNullableFilter<"Submission"> | string | null
    grade?: IntNullableFilter<"Submission"> | number | null
    feedback?: StringNullableFilter<"Submission"> | string | null
    isGraded?: BoolFilter<"Submission"> | boolean
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    assignmentId?: SortOrder
    content?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    isGraded?: SortOrder
    student?: ProfileOrderByWithRelationInput
    assignment?: AssignmentOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_assignmentId?: SubmissionStudentIdAssignmentIdCompoundUniqueInput
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    studentId?: UuidFilter<"Submission"> | string
    assignmentId?: UuidFilter<"Submission"> | string
    content?: StringNullableFilter<"Submission"> | string | null
    fileUrl?: StringNullableFilter<"Submission"> | string | null
    grade?: IntNullableFilter<"Submission"> | number | null
    feedback?: StringNullableFilter<"Submission"> | string | null
    isGraded?: BoolFilter<"Submission"> | boolean
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
  }, "id" | "studentId_assignmentId">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    assignmentId?: SortOrder
    content?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    isGraded?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Submission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    studentId?: UuidWithAggregatesFilter<"Submission"> | string
    assignmentId?: UuidWithAggregatesFilter<"Submission"> | string
    content?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    fileUrl?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    grade?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    feedback?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    isGraded?: BoolWithAggregatesFilter<"Submission"> | boolean
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    id?: UuidFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    authorId?: UuidFilter<"Announcement"> | string
    classId?: UuidNullableFilter<"Announcement"> | string | null
    author?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
  }

  export type AnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    classId?: SortOrderInput | SortOrder
    author?: ProfileOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    authorId?: UuidFilter<"Announcement"> | string
    classId?: UuidNullableFilter<"Announcement"> | string | null
    author?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
  }, "id">

  export type AnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    classId?: SortOrderInput | SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Announcement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    authorId?: UuidWithAggregatesFilter<"Announcement"> | string
    classId?: UuidNullableWithAggregatesFilter<"Announcement"> | string | null
  }

  export type ParentStudentRelationshipWhereInput = {
    AND?: ParentStudentRelationshipWhereInput | ParentStudentRelationshipWhereInput[]
    OR?: ParentStudentRelationshipWhereInput[]
    NOT?: ParentStudentRelationshipWhereInput | ParentStudentRelationshipWhereInput[]
    id?: UuidFilter<"ParentStudentRelationship"> | string
    parentId?: UuidFilter<"ParentStudentRelationship"> | string
    studentId?: UuidFilter<"ParentStudentRelationship"> | string
    createdAt?: DateTimeFilter<"ParentStudentRelationship"> | Date | string
    relationshipType?: StringNullableFilter<"ParentStudentRelationship"> | string | null
    parent?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    notifications?: ParentNotificationListRelationFilter
  }

  export type ParentStudentRelationshipOrderByWithRelationInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    relationshipType?: SortOrderInput | SortOrder
    parent?: ProfileOrderByWithRelationInput
    student?: ProfileOrderByWithRelationInput
    notifications?: ParentNotificationOrderByRelationAggregateInput
  }

  export type ParentStudentRelationshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    parentId_studentId?: ParentStudentRelationshipParentIdStudentIdCompoundUniqueInput
    AND?: ParentStudentRelationshipWhereInput | ParentStudentRelationshipWhereInput[]
    OR?: ParentStudentRelationshipWhereInput[]
    NOT?: ParentStudentRelationshipWhereInput | ParentStudentRelationshipWhereInput[]
    parentId?: UuidFilter<"ParentStudentRelationship"> | string
    studentId?: UuidFilter<"ParentStudentRelationship"> | string
    createdAt?: DateTimeFilter<"ParentStudentRelationship"> | Date | string
    relationshipType?: StringNullableFilter<"ParentStudentRelationship"> | string | null
    parent?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    notifications?: ParentNotificationListRelationFilter
  }, "id" | "parentId_studentId">

  export type ParentStudentRelationshipOrderByWithAggregationInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    relationshipType?: SortOrderInput | SortOrder
    _count?: ParentStudentRelationshipCountOrderByAggregateInput
    _max?: ParentStudentRelationshipMaxOrderByAggregateInput
    _min?: ParentStudentRelationshipMinOrderByAggregateInput
  }

  export type ParentStudentRelationshipScalarWhereWithAggregatesInput = {
    AND?: ParentStudentRelationshipScalarWhereWithAggregatesInput | ParentStudentRelationshipScalarWhereWithAggregatesInput[]
    OR?: ParentStudentRelationshipScalarWhereWithAggregatesInput[]
    NOT?: ParentStudentRelationshipScalarWhereWithAggregatesInput | ParentStudentRelationshipScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ParentStudentRelationship"> | string
    parentId?: UuidWithAggregatesFilter<"ParentStudentRelationship"> | string
    studentId?: UuidWithAggregatesFilter<"ParentStudentRelationship"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ParentStudentRelationship"> | Date | string
    relationshipType?: StringNullableWithAggregatesFilter<"ParentStudentRelationship"> | string | null
  }

  export type ParentNotificationWhereInput = {
    AND?: ParentNotificationWhereInput | ParentNotificationWhereInput[]
    OR?: ParentNotificationWhereInput[]
    NOT?: ParentNotificationWhereInput | ParentNotificationWhereInput[]
    id?: UuidFilter<"ParentNotification"> | string
    createdAt?: DateTimeFilter<"ParentNotification"> | Date | string
    parentId?: UuidFilter<"ParentNotification"> | string
    studentId?: UuidFilter<"ParentNotification"> | string
    type?: EnumNotificationTypeFilter<"ParentNotification"> | $Enums.NotificationType
    content?: StringFilter<"ParentNotification"> | string
    isRead?: BoolFilter<"ParentNotification"> | boolean
    referenceId?: UuidNullableFilter<"ParentNotification"> | string | null
    parent?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    relationship?: XOR<ParentStudentRelationshipScalarRelationFilter, ParentStudentRelationshipWhereInput>
  }

  export type ParentNotificationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    parent?: ProfileOrderByWithRelationInput
    student?: ProfileOrderByWithRelationInput
    relationship?: ParentStudentRelationshipOrderByWithRelationInput
  }

  export type ParentNotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParentNotificationWhereInput | ParentNotificationWhereInput[]
    OR?: ParentNotificationWhereInput[]
    NOT?: ParentNotificationWhereInput | ParentNotificationWhereInput[]
    createdAt?: DateTimeFilter<"ParentNotification"> | Date | string
    parentId?: UuidFilter<"ParentNotification"> | string
    studentId?: UuidFilter<"ParentNotification"> | string
    type?: EnumNotificationTypeFilter<"ParentNotification"> | $Enums.NotificationType
    content?: StringFilter<"ParentNotification"> | string
    isRead?: BoolFilter<"ParentNotification"> | boolean
    referenceId?: UuidNullableFilter<"ParentNotification"> | string | null
    parent?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    student?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    relationship?: XOR<ParentStudentRelationshipScalarRelationFilter, ParentStudentRelationshipWhereInput>
  }, "id">

  export type ParentNotificationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    _count?: ParentNotificationCountOrderByAggregateInput
    _max?: ParentNotificationMaxOrderByAggregateInput
    _min?: ParentNotificationMinOrderByAggregateInput
  }

  export type ParentNotificationScalarWhereWithAggregatesInput = {
    AND?: ParentNotificationScalarWhereWithAggregatesInput | ParentNotificationScalarWhereWithAggregatesInput[]
    OR?: ParentNotificationScalarWhereWithAggregatesInput[]
    NOT?: ParentNotificationScalarWhereWithAggregatesInput | ParentNotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ParentNotification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ParentNotification"> | Date | string
    parentId?: UuidWithAggregatesFilter<"ParentNotification"> | string
    studentId?: UuidWithAggregatesFilter<"ParentNotification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"ParentNotification"> | $Enums.NotificationType
    content?: StringWithAggregatesFilter<"ParentNotification"> | string
    isRead?: BoolWithAggregatesFilter<"ParentNotification"> | boolean
    referenceId?: UuidNullableWithAggregatesFilter<"ParentNotification"> | string | null
  }

  export type ProfileCreateInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    teacher?: ProfileCreateNestedOneWithoutTeacherClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
    announcements?: AnnouncementCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    teacherId?: string | null
    imageUrl?: string | null
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: ProfileUpdateOneWithoutTeacherClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateManyInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    teacherId?: string | null
    imageUrl?: string | null
  }

  export type ClassUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentCreateInput = {
    id?: string
    createdAt?: Date | string
    student: ProfileCreateNestedOneWithoutStudentEnrollmentsInput
    class: ClassCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    classId: string
  }

  export type EnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: ProfileUpdateOneRequiredWithoutStudentEnrollmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
  }

  export type EnrollmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    classId: string
  }

  export type EnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentCreateInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    points?: number
    class: ClassCreateNestedOneWithoutAssignmentsInput
    submissions?: SubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    classId: string
    points?: number
    submissions?: SubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: IntFieldUpdateOperationsInput | number
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
    submissions?: SubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    submissions?: SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    classId: string
    points?: number
  }

  export type AssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: IntFieldUpdateOperationsInput | number
  }

  export type AssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
  }

  export type SubmissionCreateInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
    student: ProfileCreateNestedOneWithoutStudentSubmissionsInput
    assignment: AssignmentCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    assignmentId: string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
    student?: ProfileUpdateOneRequiredWithoutStudentSubmissionsNestedInput
    assignment?: AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignmentId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubmissionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    assignmentId: string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    assignmentId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementCreateInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    author: ProfileCreateNestedOneWithoutAuthorAnnouncementsInput
    class?: ClassCreateNestedOneWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    authorId: string
    classId?: string | null
  }

  export type AnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: ProfileUpdateOneRequiredWithoutAuthorAnnouncementsNestedInput
    class?: ClassUpdateOneWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    classId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnnouncementCreateManyInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    authorId: string
    classId?: string | null
  }

  export type AnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    classId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentStudentRelationshipCreateInput = {
    id?: string
    createdAt?: Date | string
    relationshipType?: string | null
    parent: ProfileCreateNestedOneWithoutAsParentInput
    student: ProfileCreateNestedOneWithoutAsStudentInput
    notifications?: ParentNotificationCreateNestedManyWithoutRelationshipInput
  }

  export type ParentStudentRelationshipUncheckedCreateInput = {
    id?: string
    parentId: string
    studentId: string
    createdAt?: Date | string
    relationshipType?: string | null
    notifications?: ParentNotificationUncheckedCreateNestedManyWithoutRelationshipInput
  }

  export type ParentStudentRelationshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: ProfileUpdateOneRequiredWithoutAsParentNestedInput
    student?: ProfileUpdateOneRequiredWithoutAsStudentNestedInput
    notifications?: ParentNotificationUpdateManyWithoutRelationshipNestedInput
  }

  export type ParentStudentRelationshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: ParentNotificationUncheckedUpdateManyWithoutRelationshipNestedInput
  }

  export type ParentStudentRelationshipCreateManyInput = {
    id?: string
    parentId: string
    studentId: string
    createdAt?: Date | string
    relationshipType?: string | null
  }

  export type ParentStudentRelationshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentStudentRelationshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationCreateInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
    parent: ProfileCreateNestedOneWithoutParentNotificationsInput
    student: ProfileCreateNestedOneWithoutStudentNotificationsInput
    relationship: ParentStudentRelationshipCreateNestedOneWithoutNotificationsInput
  }

  export type ParentNotificationUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    parentId: string
    studentId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: ProfileUpdateOneRequiredWithoutParentNotificationsNestedInput
    student?: ProfileUpdateOneRequiredWithoutStudentNotificationsNestedInput
    relationship?: ParentStudentRelationshipUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type ParentNotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationCreateManyInput = {
    id?: string
    createdAt?: Date | string
    parentId: string
    studentId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClassListRelationFilter = {
    every?: ClassWhereInput
    some?: ClassWhereInput
    none?: ClassWhereInput
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type AnnouncementListRelationFilter = {
    every?: AnnouncementWhereInput
    some?: AnnouncementWhereInput
    none?: AnnouncementWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type ParentStudentRelationshipListRelationFilter = {
    every?: ParentStudentRelationshipWhereInput
    some?: ParentStudentRelationshipWhereInput
    none?: ParentStudentRelationshipWhereInput
  }

  export type ParentNotificationListRelationFilter = {
    every?: ParentNotificationWhereInput
    some?: ParentNotificationWhereInput
    none?: ParentNotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParentStudentRelationshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParentNotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    avatarUrl?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type AssignmentListRelationFilter = {
    every?: AssignmentWhereInput
    some?: AssignmentWhereInput
    none?: AssignmentWhereInput
  }

  export type AssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    teacherId?: SortOrder
    imageUrl?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    teacherId?: SortOrder
    imageUrl?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    teacherId?: SortOrder
    imageUrl?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput
    isNot?: ClassWhereInput
  }

  export type EnrollmentStudentIdClassIdCompoundUniqueInput = {
    studentId: string
    classId: string
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    classId?: SortOrder
    points?: SortOrder
  }

  export type AssignmentAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type AssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    classId?: SortOrder
    points?: SortOrder
  }

  export type AssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueDate?: SortOrder
    classId?: SortOrder
    points?: SortOrder
  }

  export type AssignmentSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AssignmentScalarRelationFilter = {
    is?: AssignmentWhereInput
    isNot?: AssignmentWhereInput
  }

  export type SubmissionStudentIdAssignmentIdCompoundUniqueInput = {
    studentId: string
    assignmentId: string
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    assignmentId?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrder
    grade?: SortOrder
    feedback?: SortOrder
    isGraded?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    grade?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    assignmentId?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrder
    grade?: SortOrder
    feedback?: SortOrder
    isGraded?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    studentId?: SortOrder
    assignmentId?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrder
    grade?: SortOrder
    feedback?: SortOrder
    isGraded?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    grade?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ClassNullableScalarRelationFilter = {
    is?: ClassWhereInput | null
    isNot?: ClassWhereInput | null
  }

  export type AnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    classId?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    classId?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    classId?: SortOrder
  }

  export type ParentStudentRelationshipParentIdStudentIdCompoundUniqueInput = {
    parentId: string
    studentId: string
  }

  export type ParentStudentRelationshipCountOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    relationshipType?: SortOrder
  }

  export type ParentStudentRelationshipMaxOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    relationshipType?: SortOrder
  }

  export type ParentStudentRelationshipMinOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    relationshipType?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type ParentStudentRelationshipScalarRelationFilter = {
    is?: ParentStudentRelationshipWhereInput
    isNot?: ParentStudentRelationshipWhereInput
  }

  export type ParentNotificationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    referenceId?: SortOrder
  }

  export type ParentNotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    referenceId?: SortOrder
  }

  export type ParentNotificationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    referenceId?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type ClassCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AnnouncementCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutStudentInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ParentStudentRelationshipCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutParentInput, ParentStudentRelationshipUncheckedCreateWithoutParentInput> | ParentStudentRelationshipCreateWithoutParentInput[] | ParentStudentRelationshipUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutParentInput | ParentStudentRelationshipCreateOrConnectWithoutParentInput[]
    createMany?: ParentStudentRelationshipCreateManyParentInputEnvelope
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
  }

  export type ParentStudentRelationshipCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutStudentInput, ParentStudentRelationshipUncheckedCreateWithoutStudentInput> | ParentStudentRelationshipCreateWithoutStudentInput[] | ParentStudentRelationshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutStudentInput | ParentStudentRelationshipCreateOrConnectWithoutStudentInput[]
    createMany?: ParentStudentRelationshipCreateManyStudentInputEnvelope
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
  }

  export type ParentNotificationCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentNotificationCreateWithoutParentInput, ParentNotificationUncheckedCreateWithoutParentInput> | ParentNotificationCreateWithoutParentInput[] | ParentNotificationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutParentInput | ParentNotificationCreateOrConnectWithoutParentInput[]
    createMany?: ParentNotificationCreateManyParentInputEnvelope
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
  }

  export type ParentNotificationCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParentNotificationCreateWithoutStudentInput, ParentNotificationUncheckedCreateWithoutStudentInput> | ParentNotificationCreateWithoutStudentInput[] | ParentNotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutStudentInput | ParentNotificationCreateOrConnectWithoutStudentInput[]
    createMany?: ParentNotificationCreateManyStudentInputEnvelope
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
  }

  export type ClassUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutParentInput, ParentStudentRelationshipUncheckedCreateWithoutParentInput> | ParentStudentRelationshipCreateWithoutParentInput[] | ParentStudentRelationshipUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutParentInput | ParentStudentRelationshipCreateOrConnectWithoutParentInput[]
    createMany?: ParentStudentRelationshipCreateManyParentInputEnvelope
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
  }

  export type ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutStudentInput, ParentStudentRelationshipUncheckedCreateWithoutStudentInput> | ParentStudentRelationshipCreateWithoutStudentInput[] | ParentStudentRelationshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutStudentInput | ParentStudentRelationshipCreateOrConnectWithoutStudentInput[]
    createMany?: ParentStudentRelationshipCreateManyStudentInputEnvelope
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
  }

  export type ParentNotificationUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentNotificationCreateWithoutParentInput, ParentNotificationUncheckedCreateWithoutParentInput> | ParentNotificationCreateWithoutParentInput[] | ParentNotificationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutParentInput | ParentNotificationCreateOrConnectWithoutParentInput[]
    createMany?: ParentNotificationCreateManyParentInputEnvelope
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
  }

  export type ParentNotificationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParentNotificationCreateWithoutStudentInput, ParentNotificationUncheckedCreateWithoutStudentInput> | ParentNotificationCreateWithoutStudentInput[] | ParentNotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutStudentInput | ParentNotificationCreateOrConnectWithoutStudentInput[]
    createMany?: ParentNotificationCreateManyStudentInputEnvelope
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClassUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutTeacherInput | ClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutTeacherInput | ClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutTeacherInput | ClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AnnouncementUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutStudentNestedInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutStudentInput | SubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutStudentInput | SubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutStudentInput | SubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ParentStudentRelationshipUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutParentInput, ParentStudentRelationshipUncheckedCreateWithoutParentInput> | ParentStudentRelationshipCreateWithoutParentInput[] | ParentStudentRelationshipUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutParentInput | ParentStudentRelationshipCreateOrConnectWithoutParentInput[]
    upsert?: ParentStudentRelationshipUpsertWithWhereUniqueWithoutParentInput | ParentStudentRelationshipUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentStudentRelationshipCreateManyParentInputEnvelope
    set?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    disconnect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    delete?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    update?: ParentStudentRelationshipUpdateWithWhereUniqueWithoutParentInput | ParentStudentRelationshipUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentStudentRelationshipUpdateManyWithWhereWithoutParentInput | ParentStudentRelationshipUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentStudentRelationshipScalarWhereInput | ParentStudentRelationshipScalarWhereInput[]
  }

  export type ParentStudentRelationshipUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutStudentInput, ParentStudentRelationshipUncheckedCreateWithoutStudentInput> | ParentStudentRelationshipCreateWithoutStudentInput[] | ParentStudentRelationshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutStudentInput | ParentStudentRelationshipCreateOrConnectWithoutStudentInput[]
    upsert?: ParentStudentRelationshipUpsertWithWhereUniqueWithoutStudentInput | ParentStudentRelationshipUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParentStudentRelationshipCreateManyStudentInputEnvelope
    set?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    disconnect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    delete?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    update?: ParentStudentRelationshipUpdateWithWhereUniqueWithoutStudentInput | ParentStudentRelationshipUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParentStudentRelationshipUpdateManyWithWhereWithoutStudentInput | ParentStudentRelationshipUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParentStudentRelationshipScalarWhereInput | ParentStudentRelationshipScalarWhereInput[]
  }

  export type ParentNotificationUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentNotificationCreateWithoutParentInput, ParentNotificationUncheckedCreateWithoutParentInput> | ParentNotificationCreateWithoutParentInput[] | ParentNotificationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutParentInput | ParentNotificationCreateOrConnectWithoutParentInput[]
    upsert?: ParentNotificationUpsertWithWhereUniqueWithoutParentInput | ParentNotificationUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentNotificationCreateManyParentInputEnvelope
    set?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    disconnect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    delete?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    update?: ParentNotificationUpdateWithWhereUniqueWithoutParentInput | ParentNotificationUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentNotificationUpdateManyWithWhereWithoutParentInput | ParentNotificationUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
  }

  export type ParentNotificationUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParentNotificationCreateWithoutStudentInput, ParentNotificationUncheckedCreateWithoutStudentInput> | ParentNotificationCreateWithoutStudentInput[] | ParentNotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutStudentInput | ParentNotificationCreateOrConnectWithoutStudentInput[]
    upsert?: ParentNotificationUpsertWithWhereUniqueWithoutStudentInput | ParentNotificationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParentNotificationCreateManyStudentInputEnvelope
    set?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    disconnect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    delete?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    update?: ParentNotificationUpdateWithWhereUniqueWithoutStudentInput | ParentNotificationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParentNotificationUpdateManyWithWhereWithoutStudentInput | ParentNotificationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
  }

  export type ClassUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutTeacherInput | ClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutTeacherInput | ClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutTeacherInput | ClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutStudentInput | SubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutStudentInput | SubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutStudentInput | SubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutParentInput, ParentStudentRelationshipUncheckedCreateWithoutParentInput> | ParentStudentRelationshipCreateWithoutParentInput[] | ParentStudentRelationshipUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutParentInput | ParentStudentRelationshipCreateOrConnectWithoutParentInput[]
    upsert?: ParentStudentRelationshipUpsertWithWhereUniqueWithoutParentInput | ParentStudentRelationshipUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentStudentRelationshipCreateManyParentInputEnvelope
    set?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    disconnect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    delete?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    update?: ParentStudentRelationshipUpdateWithWhereUniqueWithoutParentInput | ParentStudentRelationshipUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentStudentRelationshipUpdateManyWithWhereWithoutParentInput | ParentStudentRelationshipUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentStudentRelationshipScalarWhereInput | ParentStudentRelationshipScalarWhereInput[]
  }

  export type ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutStudentInput, ParentStudentRelationshipUncheckedCreateWithoutStudentInput> | ParentStudentRelationshipCreateWithoutStudentInput[] | ParentStudentRelationshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutStudentInput | ParentStudentRelationshipCreateOrConnectWithoutStudentInput[]
    upsert?: ParentStudentRelationshipUpsertWithWhereUniqueWithoutStudentInput | ParentStudentRelationshipUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParentStudentRelationshipCreateManyStudentInputEnvelope
    set?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    disconnect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    delete?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    connect?: ParentStudentRelationshipWhereUniqueInput | ParentStudentRelationshipWhereUniqueInput[]
    update?: ParentStudentRelationshipUpdateWithWhereUniqueWithoutStudentInput | ParentStudentRelationshipUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParentStudentRelationshipUpdateManyWithWhereWithoutStudentInput | ParentStudentRelationshipUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParentStudentRelationshipScalarWhereInput | ParentStudentRelationshipScalarWhereInput[]
  }

  export type ParentNotificationUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentNotificationCreateWithoutParentInput, ParentNotificationUncheckedCreateWithoutParentInput> | ParentNotificationCreateWithoutParentInput[] | ParentNotificationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutParentInput | ParentNotificationCreateOrConnectWithoutParentInput[]
    upsert?: ParentNotificationUpsertWithWhereUniqueWithoutParentInput | ParentNotificationUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentNotificationCreateManyParentInputEnvelope
    set?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    disconnect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    delete?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    update?: ParentNotificationUpdateWithWhereUniqueWithoutParentInput | ParentNotificationUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentNotificationUpdateManyWithWhereWithoutParentInput | ParentNotificationUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
  }

  export type ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParentNotificationCreateWithoutStudentInput, ParentNotificationUncheckedCreateWithoutStudentInput> | ParentNotificationCreateWithoutStudentInput[] | ParentNotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutStudentInput | ParentNotificationCreateOrConnectWithoutStudentInput[]
    upsert?: ParentNotificationUpsertWithWhereUniqueWithoutStudentInput | ParentNotificationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParentNotificationCreateManyStudentInputEnvelope
    set?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    disconnect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    delete?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    update?: ParentNotificationUpdateWithWhereUniqueWithoutStudentInput | ParentNotificationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParentNotificationUpdateManyWithWhereWithoutStudentInput | ParentNotificationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutTeacherClassesInput = {
    create?: XOR<ProfileCreateWithoutTeacherClassesInput, ProfileUncheckedCreateWithoutTeacherClassesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTeacherClassesInput
    connect?: ProfileWhereUniqueInput
  }

  export type EnrollmentCreateNestedManyWithoutClassInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AssignmentCreateNestedManyWithoutClassInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type AnnouncementCreateNestedManyWithoutClassInput = {
    create?: XOR<AnnouncementCreateWithoutClassInput, AnnouncementUncheckedCreateWithoutClassInput> | AnnouncementCreateWithoutClassInput[] | AnnouncementUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutClassInput | AnnouncementCreateOrConnectWithoutClassInput[]
    createMany?: AnnouncementCreateManyClassInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AssignmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<AnnouncementCreateWithoutClassInput, AnnouncementUncheckedCreateWithoutClassInput> | AnnouncementCreateWithoutClassInput[] | AnnouncementUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutClassInput | AnnouncementCreateOrConnectWithoutClassInput[]
    createMany?: AnnouncementCreateManyClassInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type ProfileUpdateOneWithoutTeacherClassesNestedInput = {
    create?: XOR<ProfileCreateWithoutTeacherClassesInput, ProfileUncheckedCreateWithoutTeacherClassesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTeacherClassesInput
    upsert?: ProfileUpsertWithoutTeacherClassesInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutTeacherClassesInput, ProfileUpdateWithoutTeacherClassesInput>, ProfileUncheckedUpdateWithoutTeacherClassesInput>
  }

  export type EnrollmentUpdateManyWithoutClassNestedInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutClassInput | EnrollmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutClassInput | EnrollmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutClassInput | EnrollmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AssignmentUpdateManyWithoutClassNestedInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutClassInput | AssignmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutClassInput | AssignmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutClassInput | AssignmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type AnnouncementUpdateManyWithoutClassNestedInput = {
    create?: XOR<AnnouncementCreateWithoutClassInput, AnnouncementUncheckedCreateWithoutClassInput> | AnnouncementCreateWithoutClassInput[] | AnnouncementUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutClassInput | AnnouncementCreateOrConnectWithoutClassInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutClassInput | AnnouncementUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AnnouncementCreateManyClassInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutClassInput | AnnouncementUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutClassInput | AnnouncementUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutClassInput | EnrollmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutClassInput | EnrollmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutClassInput | EnrollmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AssignmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutClassInput | AssignmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutClassInput | AssignmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutClassInput | AssignmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<AnnouncementCreateWithoutClassInput, AnnouncementUncheckedCreateWithoutClassInput> | AnnouncementCreateWithoutClassInput[] | AnnouncementUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutClassInput | AnnouncementCreateOrConnectWithoutClassInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutClassInput | AnnouncementUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AnnouncementCreateManyClassInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutClassInput | AnnouncementUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutClassInput | AnnouncementUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutStudentEnrollmentsInput = {
    create?: XOR<ProfileCreateWithoutStudentEnrollmentsInput, ProfileUncheckedCreateWithoutStudentEnrollmentsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutStudentEnrollmentsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutEnrollmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutStudentEnrollmentsNestedInput = {
    create?: XOR<ProfileCreateWithoutStudentEnrollmentsInput, ProfileUncheckedCreateWithoutStudentEnrollmentsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutStudentEnrollmentsInput
    upsert?: ProfileUpsertWithoutStudentEnrollmentsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutStudentEnrollmentsInput, ProfileUpdateWithoutStudentEnrollmentsInput>, ProfileUncheckedUpdateWithoutStudentEnrollmentsInput>
  }

  export type ClassUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutEnrollmentsInput
    upsert?: ClassUpsertWithoutEnrollmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutEnrollmentsInput, ClassUpdateWithoutEnrollmentsInput>, ClassUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ClassCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAssignmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type SubmissionCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClassUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAssignmentsInput
    upsert?: ClassUpsertWithoutAssignmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutAssignmentsInput, ClassUpdateWithoutAssignmentsInput>, ClassUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubmissionUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutAssignmentInput | SubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutAssignmentInput | SubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutAssignmentInput | SubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutAssignmentInput | SubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutAssignmentInput | SubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutAssignmentInput | SubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutStudentSubmissionsInput = {
    create?: XOR<ProfileCreateWithoutStudentSubmissionsInput, ProfileUncheckedCreateWithoutStudentSubmissionsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutStudentSubmissionsInput
    connect?: ProfileWhereUniqueInput
  }

  export type AssignmentCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubmissionsInput
    connect?: AssignmentWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProfileUpdateOneRequiredWithoutStudentSubmissionsNestedInput = {
    create?: XOR<ProfileCreateWithoutStudentSubmissionsInput, ProfileUncheckedCreateWithoutStudentSubmissionsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutStudentSubmissionsInput
    upsert?: ProfileUpsertWithoutStudentSubmissionsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutStudentSubmissionsInput, ProfileUpdateWithoutStudentSubmissionsInput>, ProfileUncheckedUpdateWithoutStudentSubmissionsInput>
  }

  export type AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubmissionsInput
    upsert?: AssignmentUpsertWithoutSubmissionsInput
    connect?: AssignmentWhereUniqueInput
    update?: XOR<XOR<AssignmentUpdateToOneWithWhereWithoutSubmissionsInput, AssignmentUpdateWithoutSubmissionsInput>, AssignmentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProfileCreateNestedOneWithoutAuthorAnnouncementsInput = {
    create?: XOR<ProfileCreateWithoutAuthorAnnouncementsInput, ProfileUncheckedCreateWithoutAuthorAnnouncementsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAuthorAnnouncementsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutAnnouncementsInput = {
    create?: XOR<ClassCreateWithoutAnnouncementsInput, ClassUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAnnouncementsInput
    connect?: ClassWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutAuthorAnnouncementsNestedInput = {
    create?: XOR<ProfileCreateWithoutAuthorAnnouncementsInput, ProfileUncheckedCreateWithoutAuthorAnnouncementsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAuthorAnnouncementsInput
    upsert?: ProfileUpsertWithoutAuthorAnnouncementsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAuthorAnnouncementsInput, ProfileUpdateWithoutAuthorAnnouncementsInput>, ProfileUncheckedUpdateWithoutAuthorAnnouncementsInput>
  }

  export type ClassUpdateOneWithoutAnnouncementsNestedInput = {
    create?: XOR<ClassCreateWithoutAnnouncementsInput, ClassUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAnnouncementsInput
    upsert?: ClassUpsertWithoutAnnouncementsInput
    disconnect?: ClassWhereInput | boolean
    delete?: ClassWhereInput | boolean
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutAnnouncementsInput, ClassUpdateWithoutAnnouncementsInput>, ClassUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type ProfileCreateNestedOneWithoutAsParentInput = {
    create?: XOR<ProfileCreateWithoutAsParentInput, ProfileUncheckedCreateWithoutAsParentInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAsParentInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutAsStudentInput = {
    create?: XOR<ProfileCreateWithoutAsStudentInput, ProfileUncheckedCreateWithoutAsStudentInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAsStudentInput
    connect?: ProfileWhereUniqueInput
  }

  export type ParentNotificationCreateNestedManyWithoutRelationshipInput = {
    create?: XOR<ParentNotificationCreateWithoutRelationshipInput, ParentNotificationUncheckedCreateWithoutRelationshipInput> | ParentNotificationCreateWithoutRelationshipInput[] | ParentNotificationUncheckedCreateWithoutRelationshipInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutRelationshipInput | ParentNotificationCreateOrConnectWithoutRelationshipInput[]
    createMany?: ParentNotificationCreateManyRelationshipInputEnvelope
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
  }

  export type ParentNotificationUncheckedCreateNestedManyWithoutRelationshipInput = {
    create?: XOR<ParentNotificationCreateWithoutRelationshipInput, ParentNotificationUncheckedCreateWithoutRelationshipInput> | ParentNotificationCreateWithoutRelationshipInput[] | ParentNotificationUncheckedCreateWithoutRelationshipInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutRelationshipInput | ParentNotificationCreateOrConnectWithoutRelationshipInput[]
    createMany?: ParentNotificationCreateManyRelationshipInputEnvelope
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
  }

  export type ProfileUpdateOneRequiredWithoutAsParentNestedInput = {
    create?: XOR<ProfileCreateWithoutAsParentInput, ProfileUncheckedCreateWithoutAsParentInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAsParentInput
    upsert?: ProfileUpsertWithoutAsParentInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAsParentInput, ProfileUpdateWithoutAsParentInput>, ProfileUncheckedUpdateWithoutAsParentInput>
  }

  export type ProfileUpdateOneRequiredWithoutAsStudentNestedInput = {
    create?: XOR<ProfileCreateWithoutAsStudentInput, ProfileUncheckedCreateWithoutAsStudentInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutAsStudentInput
    upsert?: ProfileUpsertWithoutAsStudentInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutAsStudentInput, ProfileUpdateWithoutAsStudentInput>, ProfileUncheckedUpdateWithoutAsStudentInput>
  }

  export type ParentNotificationUpdateManyWithoutRelationshipNestedInput = {
    create?: XOR<ParentNotificationCreateWithoutRelationshipInput, ParentNotificationUncheckedCreateWithoutRelationshipInput> | ParentNotificationCreateWithoutRelationshipInput[] | ParentNotificationUncheckedCreateWithoutRelationshipInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutRelationshipInput | ParentNotificationCreateOrConnectWithoutRelationshipInput[]
    upsert?: ParentNotificationUpsertWithWhereUniqueWithoutRelationshipInput | ParentNotificationUpsertWithWhereUniqueWithoutRelationshipInput[]
    createMany?: ParentNotificationCreateManyRelationshipInputEnvelope
    set?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    disconnect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    delete?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    update?: ParentNotificationUpdateWithWhereUniqueWithoutRelationshipInput | ParentNotificationUpdateWithWhereUniqueWithoutRelationshipInput[]
    updateMany?: ParentNotificationUpdateManyWithWhereWithoutRelationshipInput | ParentNotificationUpdateManyWithWhereWithoutRelationshipInput[]
    deleteMany?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
  }

  export type ParentNotificationUncheckedUpdateManyWithoutRelationshipNestedInput = {
    create?: XOR<ParentNotificationCreateWithoutRelationshipInput, ParentNotificationUncheckedCreateWithoutRelationshipInput> | ParentNotificationCreateWithoutRelationshipInput[] | ParentNotificationUncheckedCreateWithoutRelationshipInput[]
    connectOrCreate?: ParentNotificationCreateOrConnectWithoutRelationshipInput | ParentNotificationCreateOrConnectWithoutRelationshipInput[]
    upsert?: ParentNotificationUpsertWithWhereUniqueWithoutRelationshipInput | ParentNotificationUpsertWithWhereUniqueWithoutRelationshipInput[]
    createMany?: ParentNotificationCreateManyRelationshipInputEnvelope
    set?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    disconnect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    delete?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    connect?: ParentNotificationWhereUniqueInput | ParentNotificationWhereUniqueInput[]
    update?: ParentNotificationUpdateWithWhereUniqueWithoutRelationshipInput | ParentNotificationUpdateWithWhereUniqueWithoutRelationshipInput[]
    updateMany?: ParentNotificationUpdateManyWithWhereWithoutRelationshipInput | ParentNotificationUpdateManyWithWhereWithoutRelationshipInput[]
    deleteMany?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutParentNotificationsInput = {
    create?: XOR<ProfileCreateWithoutParentNotificationsInput, ProfileUncheckedCreateWithoutParentNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutParentNotificationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutStudentNotificationsInput = {
    create?: XOR<ProfileCreateWithoutStudentNotificationsInput, ProfileUncheckedCreateWithoutStudentNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutStudentNotificationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ParentStudentRelationshipCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutNotificationsInput, ParentStudentRelationshipUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutNotificationsInput
    connect?: ParentStudentRelationshipWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type ProfileUpdateOneRequiredWithoutParentNotificationsNestedInput = {
    create?: XOR<ProfileCreateWithoutParentNotificationsInput, ProfileUncheckedCreateWithoutParentNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutParentNotificationsInput
    upsert?: ProfileUpsertWithoutParentNotificationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutParentNotificationsInput, ProfileUpdateWithoutParentNotificationsInput>, ProfileUncheckedUpdateWithoutParentNotificationsInput>
  }

  export type ProfileUpdateOneRequiredWithoutStudentNotificationsNestedInput = {
    create?: XOR<ProfileCreateWithoutStudentNotificationsInput, ProfileUncheckedCreateWithoutStudentNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutStudentNotificationsInput
    upsert?: ProfileUpsertWithoutStudentNotificationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutStudentNotificationsInput, ProfileUpdateWithoutStudentNotificationsInput>, ProfileUncheckedUpdateWithoutStudentNotificationsInput>
  }

  export type ParentStudentRelationshipUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<ParentStudentRelationshipCreateWithoutNotificationsInput, ParentStudentRelationshipUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ParentStudentRelationshipCreateOrConnectWithoutNotificationsInput
    upsert?: ParentStudentRelationshipUpsertWithoutNotificationsInput
    connect?: ParentStudentRelationshipWhereUniqueInput
    update?: XOR<XOR<ParentStudentRelationshipUpdateToOneWithWhereWithoutNotificationsInput, ParentStudentRelationshipUpdateWithoutNotificationsInput>, ParentStudentRelationshipUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type ClassCreateWithoutTeacherInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
    announcements?: AnnouncementCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutTeacherInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput>
  }

  export type ClassCreateManyTeacherInputEnvelope = {
    data: ClassCreateManyTeacherInput | ClassCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    class: ClassCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    classId: string
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    class?: ClassCreateNestedOneWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    classId?: string | null
  }

  export type AnnouncementCreateOrConnectWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementCreateManyAuthorInputEnvelope = {
    data: AnnouncementCreateManyAuthorInput | AnnouncementCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
    assignment: AssignmentCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    assignmentId: string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
  }

  export type SubmissionCreateOrConnectWithoutStudentInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput>
  }

  export type SubmissionCreateManyStudentInputEnvelope = {
    data: SubmissionCreateManyStudentInput | SubmissionCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ParentStudentRelationshipCreateWithoutParentInput = {
    id?: string
    createdAt?: Date | string
    relationshipType?: string | null
    student: ProfileCreateNestedOneWithoutAsStudentInput
    notifications?: ParentNotificationCreateNestedManyWithoutRelationshipInput
  }

  export type ParentStudentRelationshipUncheckedCreateWithoutParentInput = {
    id?: string
    studentId: string
    createdAt?: Date | string
    relationshipType?: string | null
    notifications?: ParentNotificationUncheckedCreateNestedManyWithoutRelationshipInput
  }

  export type ParentStudentRelationshipCreateOrConnectWithoutParentInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    create: XOR<ParentStudentRelationshipCreateWithoutParentInput, ParentStudentRelationshipUncheckedCreateWithoutParentInput>
  }

  export type ParentStudentRelationshipCreateManyParentInputEnvelope = {
    data: ParentStudentRelationshipCreateManyParentInput | ParentStudentRelationshipCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ParentStudentRelationshipCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    relationshipType?: string | null
    parent: ProfileCreateNestedOneWithoutAsParentInput
    notifications?: ParentNotificationCreateNestedManyWithoutRelationshipInput
  }

  export type ParentStudentRelationshipUncheckedCreateWithoutStudentInput = {
    id?: string
    parentId: string
    createdAt?: Date | string
    relationshipType?: string | null
    notifications?: ParentNotificationUncheckedCreateNestedManyWithoutRelationshipInput
  }

  export type ParentStudentRelationshipCreateOrConnectWithoutStudentInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    create: XOR<ParentStudentRelationshipCreateWithoutStudentInput, ParentStudentRelationshipUncheckedCreateWithoutStudentInput>
  }

  export type ParentStudentRelationshipCreateManyStudentInputEnvelope = {
    data: ParentStudentRelationshipCreateManyStudentInput | ParentStudentRelationshipCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ParentNotificationCreateWithoutParentInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
    student: ProfileCreateNestedOneWithoutStudentNotificationsInput
    relationship: ParentStudentRelationshipCreateNestedOneWithoutNotificationsInput
  }

  export type ParentNotificationUncheckedCreateWithoutParentInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationCreateOrConnectWithoutParentInput = {
    where: ParentNotificationWhereUniqueInput
    create: XOR<ParentNotificationCreateWithoutParentInput, ParentNotificationUncheckedCreateWithoutParentInput>
  }

  export type ParentNotificationCreateManyParentInputEnvelope = {
    data: ParentNotificationCreateManyParentInput | ParentNotificationCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ParentNotificationCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
    parent: ProfileCreateNestedOneWithoutParentNotificationsInput
    relationship: ParentStudentRelationshipCreateNestedOneWithoutNotificationsInput
  }

  export type ParentNotificationUncheckedCreateWithoutStudentInput = {
    id?: string
    createdAt?: Date | string
    parentId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationCreateOrConnectWithoutStudentInput = {
    where: ParentNotificationWhereUniqueInput
    create: XOR<ParentNotificationCreateWithoutStudentInput, ParentNotificationUncheckedCreateWithoutStudentInput>
  }

  export type ParentNotificationCreateManyStudentInputEnvelope = {
    data: ParentNotificationCreateManyStudentInput | ParentNotificationCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutTeacherInput, ClassUncheckedUpdateWithoutTeacherInput>
    create: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutTeacherInput, ClassUncheckedUpdateWithoutTeacherInput>
  }

  export type ClassUpdateManyWithWhereWithoutTeacherInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[]
    OR?: ClassScalarWhereInput[]
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[]
    id?: UuidFilter<"Class"> | string
    createdAt?: DateTimeFilter<"Class"> | Date | string
    name?: StringFilter<"Class"> | string
    description?: StringNullableFilter<"Class"> | string | null
    teacherId?: UuidNullableFilter<"Class"> | string | null
    imageUrl?: StringNullableFilter<"Class"> | string | null
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: UuidFilter<"Enrollment"> | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    studentId?: UuidFilter<"Enrollment"> | string
    classId?: UuidFilter<"Enrollment"> | string
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutAuthorInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutAuthorInput>
  }

  export type AnnouncementScalarWhereInput = {
    AND?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    OR?: AnnouncementScalarWhereInput[]
    NOT?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    id?: UuidFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    authorId?: UuidFilter<"Announcement"> | string
    classId?: UuidNullableFilter<"Announcement"> | string | null
  }

  export type SubmissionUpsertWithWhereUniqueWithoutStudentInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutStudentInput, SubmissionUncheckedUpdateWithoutStudentInput>
    create: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutStudentInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutStudentInput, SubmissionUncheckedUpdateWithoutStudentInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutStudentInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutStudentInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: UuidFilter<"Submission"> | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    studentId?: UuidFilter<"Submission"> | string
    assignmentId?: UuidFilter<"Submission"> | string
    content?: StringNullableFilter<"Submission"> | string | null
    fileUrl?: StringNullableFilter<"Submission"> | string | null
    grade?: IntNullableFilter<"Submission"> | number | null
    feedback?: StringNullableFilter<"Submission"> | string | null
    isGraded?: BoolFilter<"Submission"> | boolean
  }

  export type ParentStudentRelationshipUpsertWithWhereUniqueWithoutParentInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    update: XOR<ParentStudentRelationshipUpdateWithoutParentInput, ParentStudentRelationshipUncheckedUpdateWithoutParentInput>
    create: XOR<ParentStudentRelationshipCreateWithoutParentInput, ParentStudentRelationshipUncheckedCreateWithoutParentInput>
  }

  export type ParentStudentRelationshipUpdateWithWhereUniqueWithoutParentInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    data: XOR<ParentStudentRelationshipUpdateWithoutParentInput, ParentStudentRelationshipUncheckedUpdateWithoutParentInput>
  }

  export type ParentStudentRelationshipUpdateManyWithWhereWithoutParentInput = {
    where: ParentStudentRelationshipScalarWhereInput
    data: XOR<ParentStudentRelationshipUpdateManyMutationInput, ParentStudentRelationshipUncheckedUpdateManyWithoutParentInput>
  }

  export type ParentStudentRelationshipScalarWhereInput = {
    AND?: ParentStudentRelationshipScalarWhereInput | ParentStudentRelationshipScalarWhereInput[]
    OR?: ParentStudentRelationshipScalarWhereInput[]
    NOT?: ParentStudentRelationshipScalarWhereInput | ParentStudentRelationshipScalarWhereInput[]
    id?: UuidFilter<"ParentStudentRelationship"> | string
    parentId?: UuidFilter<"ParentStudentRelationship"> | string
    studentId?: UuidFilter<"ParentStudentRelationship"> | string
    createdAt?: DateTimeFilter<"ParentStudentRelationship"> | Date | string
    relationshipType?: StringNullableFilter<"ParentStudentRelationship"> | string | null
  }

  export type ParentStudentRelationshipUpsertWithWhereUniqueWithoutStudentInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    update: XOR<ParentStudentRelationshipUpdateWithoutStudentInput, ParentStudentRelationshipUncheckedUpdateWithoutStudentInput>
    create: XOR<ParentStudentRelationshipCreateWithoutStudentInput, ParentStudentRelationshipUncheckedCreateWithoutStudentInput>
  }

  export type ParentStudentRelationshipUpdateWithWhereUniqueWithoutStudentInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    data: XOR<ParentStudentRelationshipUpdateWithoutStudentInput, ParentStudentRelationshipUncheckedUpdateWithoutStudentInput>
  }

  export type ParentStudentRelationshipUpdateManyWithWhereWithoutStudentInput = {
    where: ParentStudentRelationshipScalarWhereInput
    data: XOR<ParentStudentRelationshipUpdateManyMutationInput, ParentStudentRelationshipUncheckedUpdateManyWithoutStudentInput>
  }

  export type ParentNotificationUpsertWithWhereUniqueWithoutParentInput = {
    where: ParentNotificationWhereUniqueInput
    update: XOR<ParentNotificationUpdateWithoutParentInput, ParentNotificationUncheckedUpdateWithoutParentInput>
    create: XOR<ParentNotificationCreateWithoutParentInput, ParentNotificationUncheckedCreateWithoutParentInput>
  }

  export type ParentNotificationUpdateWithWhereUniqueWithoutParentInput = {
    where: ParentNotificationWhereUniqueInput
    data: XOR<ParentNotificationUpdateWithoutParentInput, ParentNotificationUncheckedUpdateWithoutParentInput>
  }

  export type ParentNotificationUpdateManyWithWhereWithoutParentInput = {
    where: ParentNotificationScalarWhereInput
    data: XOR<ParentNotificationUpdateManyMutationInput, ParentNotificationUncheckedUpdateManyWithoutParentInput>
  }

  export type ParentNotificationScalarWhereInput = {
    AND?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
    OR?: ParentNotificationScalarWhereInput[]
    NOT?: ParentNotificationScalarWhereInput | ParentNotificationScalarWhereInput[]
    id?: UuidFilter<"ParentNotification"> | string
    createdAt?: DateTimeFilter<"ParentNotification"> | Date | string
    parentId?: UuidFilter<"ParentNotification"> | string
    studentId?: UuidFilter<"ParentNotification"> | string
    type?: EnumNotificationTypeFilter<"ParentNotification"> | $Enums.NotificationType
    content?: StringFilter<"ParentNotification"> | string
    isRead?: BoolFilter<"ParentNotification"> | boolean
    referenceId?: UuidNullableFilter<"ParentNotification"> | string | null
  }

  export type ParentNotificationUpsertWithWhereUniqueWithoutStudentInput = {
    where: ParentNotificationWhereUniqueInput
    update: XOR<ParentNotificationUpdateWithoutStudentInput, ParentNotificationUncheckedUpdateWithoutStudentInput>
    create: XOR<ParentNotificationCreateWithoutStudentInput, ParentNotificationUncheckedCreateWithoutStudentInput>
  }

  export type ParentNotificationUpdateWithWhereUniqueWithoutStudentInput = {
    where: ParentNotificationWhereUniqueInput
    data: XOR<ParentNotificationUpdateWithoutStudentInput, ParentNotificationUncheckedUpdateWithoutStudentInput>
  }

  export type ParentNotificationUpdateManyWithWhereWithoutStudentInput = {
    where: ParentNotificationScalarWhereInput
    data: XOR<ParentNotificationUpdateManyMutationInput, ParentNotificationUncheckedUpdateManyWithoutStudentInput>
  }

  export type ProfileCreateWithoutTeacherClassesInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutTeacherClassesInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutTeacherClassesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutTeacherClassesInput, ProfileUncheckedCreateWithoutTeacherClassesInput>
  }

  export type EnrollmentCreateWithoutClassInput = {
    id?: string
    createdAt?: Date | string
    student: ProfileCreateNestedOneWithoutStudentEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutClassInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
  }

  export type EnrollmentCreateOrConnectWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput>
  }

  export type EnrollmentCreateManyClassInputEnvelope = {
    data: EnrollmentCreateManyClassInput | EnrollmentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentCreateWithoutClassInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    points?: number
    submissions?: SubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateWithoutClassInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    points?: number
    submissions?: SubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentCreateOrConnectWithoutClassInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput>
  }

  export type AssignmentCreateManyClassInputEnvelope = {
    data: AssignmentCreateManyClassInput | AssignmentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementCreateWithoutClassInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    author: ProfileCreateNestedOneWithoutAuthorAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateWithoutClassInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    authorId: string
  }

  export type AnnouncementCreateOrConnectWithoutClassInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutClassInput, AnnouncementUncheckedCreateWithoutClassInput>
  }

  export type AnnouncementCreateManyClassInputEnvelope = {
    data: AnnouncementCreateManyClassInput | AnnouncementCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutTeacherClassesInput = {
    update: XOR<ProfileUpdateWithoutTeacherClassesInput, ProfileUncheckedUpdateWithoutTeacherClassesInput>
    create: XOR<ProfileCreateWithoutTeacherClassesInput, ProfileUncheckedCreateWithoutTeacherClassesInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutTeacherClassesInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutTeacherClassesInput, ProfileUncheckedUpdateWithoutTeacherClassesInput>
  }

  export type ProfileUpdateWithoutTeacherClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutTeacherClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutClassInput, EnrollmentUncheckedUpdateWithoutClassInput>
    create: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutClassInput, EnrollmentUncheckedUpdateWithoutClassInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutClassInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutClassInput>
  }

  export type AssignmentUpsertWithWhereUniqueWithoutClassInput = {
    where: AssignmentWhereUniqueInput
    update: XOR<AssignmentUpdateWithoutClassInput, AssignmentUncheckedUpdateWithoutClassInput>
    create: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput>
  }

  export type AssignmentUpdateWithWhereUniqueWithoutClassInput = {
    where: AssignmentWhereUniqueInput
    data: XOR<AssignmentUpdateWithoutClassInput, AssignmentUncheckedUpdateWithoutClassInput>
  }

  export type AssignmentUpdateManyWithWhereWithoutClassInput = {
    where: AssignmentScalarWhereInput
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyWithoutClassInput>
  }

  export type AssignmentScalarWhereInput = {
    AND?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    OR?: AssignmentScalarWhereInput[]
    NOT?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    id?: UuidFilter<"Assignment"> | string
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    title?: StringFilter<"Assignment"> | string
    description?: StringNullableFilter<"Assignment"> | string | null
    dueDate?: DateTimeFilter<"Assignment"> | Date | string
    classId?: UuidFilter<"Assignment"> | string
    points?: IntFilter<"Assignment"> | number
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutClassInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutClassInput, AnnouncementUncheckedUpdateWithoutClassInput>
    create: XOR<AnnouncementCreateWithoutClassInput, AnnouncementUncheckedCreateWithoutClassInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutClassInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutClassInput, AnnouncementUncheckedUpdateWithoutClassInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutClassInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutClassInput>
  }

  export type ProfileCreateWithoutStudentEnrollmentsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutStudentEnrollmentsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutStudentEnrollmentsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutStudentEnrollmentsInput, ProfileUncheckedCreateWithoutStudentEnrollmentsInput>
  }

  export type ClassCreateWithoutEnrollmentsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    teacher?: ProfileCreateNestedOneWithoutTeacherClassesInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
    announcements?: AnnouncementCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    teacherId?: string | null
    imageUrl?: string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutEnrollmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
  }

  export type ProfileUpsertWithoutStudentEnrollmentsInput = {
    update: XOR<ProfileUpdateWithoutStudentEnrollmentsInput, ProfileUncheckedUpdateWithoutStudentEnrollmentsInput>
    create: XOR<ProfileCreateWithoutStudentEnrollmentsInput, ProfileUncheckedCreateWithoutStudentEnrollmentsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutStudentEnrollmentsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutStudentEnrollmentsInput, ProfileUncheckedUpdateWithoutStudentEnrollmentsInput>
  }

  export type ProfileUpdateWithoutStudentEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutStudentEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ClassUpsertWithoutEnrollmentsInput = {
    update: XOR<ClassUpdateWithoutEnrollmentsInput, ClassUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutEnrollmentsInput, ClassUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ClassUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: ProfileUpdateOneWithoutTeacherClassesNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateWithoutAssignmentsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    teacher?: ProfileCreateNestedOneWithoutTeacherClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    announcements?: AnnouncementCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    teacherId?: string | null
    imageUrl?: string | null
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutAssignmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
  }

  export type SubmissionCreateWithoutAssignmentInput = {
    id?: string
    createdAt?: Date | string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
    student: ProfileCreateNestedOneWithoutStudentSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutAssignmentInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
  }

  export type SubmissionCreateOrConnectWithoutAssignmentInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type SubmissionCreateManyAssignmentInputEnvelope = {
    data: SubmissionCreateManyAssignmentInput | SubmissionCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithoutAssignmentsInput = {
    update: XOR<ClassUpdateWithoutAssignmentsInput, ClassUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutAssignmentsInput, ClassUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ClassUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: ProfileUpdateOneWithoutTeacherClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutClassNestedInput
  }

  export type SubmissionUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutAssignmentInput, SubmissionUncheckedUpdateWithoutAssignmentInput>
    create: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutAssignmentInput, SubmissionUncheckedUpdateWithoutAssignmentInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutAssignmentInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type ProfileCreateWithoutStudentSubmissionsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutStudentSubmissionsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutStudentSubmissionsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutStudentSubmissionsInput, ProfileUncheckedCreateWithoutStudentSubmissionsInput>
  }

  export type AssignmentCreateWithoutSubmissionsInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    points?: number
    class: ClassCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    classId: string
    points?: number
  }

  export type AssignmentCreateOrConnectWithoutSubmissionsInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
  }

  export type ProfileUpsertWithoutStudentSubmissionsInput = {
    update: XOR<ProfileUpdateWithoutStudentSubmissionsInput, ProfileUncheckedUpdateWithoutStudentSubmissionsInput>
    create: XOR<ProfileCreateWithoutStudentSubmissionsInput, ProfileUncheckedCreateWithoutStudentSubmissionsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutStudentSubmissionsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutStudentSubmissionsInput, ProfileUncheckedUpdateWithoutStudentSubmissionsInput>
  }

  export type ProfileUpdateWithoutStudentSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutStudentSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type AssignmentUpsertWithoutSubmissionsInput = {
    update: XOR<AssignmentUpdateWithoutSubmissionsInput, AssignmentUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
    where?: AssignmentWhereInput
  }

  export type AssignmentUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: AssignmentWhereInput
    data: XOR<AssignmentUpdateWithoutSubmissionsInput, AssignmentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type AssignmentUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: IntFieldUpdateOperationsInput | number
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileCreateWithoutAuthorAnnouncementsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutAuthorAnnouncementsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutAuthorAnnouncementsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAuthorAnnouncementsInput, ProfileUncheckedCreateWithoutAuthorAnnouncementsInput>
  }

  export type ClassCreateWithoutAnnouncementsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    teacher?: ProfileCreateNestedOneWithoutTeacherClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutAnnouncementsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    teacherId?: string | null
    imageUrl?: string | null
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutAnnouncementsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutAnnouncementsInput, ClassUncheckedCreateWithoutAnnouncementsInput>
  }

  export type ProfileUpsertWithoutAuthorAnnouncementsInput = {
    update: XOR<ProfileUpdateWithoutAuthorAnnouncementsInput, ProfileUncheckedUpdateWithoutAuthorAnnouncementsInput>
    create: XOR<ProfileCreateWithoutAuthorAnnouncementsInput, ProfileUncheckedCreateWithoutAuthorAnnouncementsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAuthorAnnouncementsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAuthorAnnouncementsInput, ProfileUncheckedUpdateWithoutAuthorAnnouncementsInput>
  }

  export type ProfileUpdateWithoutAuthorAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAuthorAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ClassUpsertWithoutAnnouncementsInput = {
    update: XOR<ClassUpdateWithoutAnnouncementsInput, ClassUncheckedUpdateWithoutAnnouncementsInput>
    create: XOR<ClassCreateWithoutAnnouncementsInput, ClassUncheckedCreateWithoutAnnouncementsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutAnnouncementsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutAnnouncementsInput, ClassUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type ClassUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: ProfileUpdateOneWithoutTeacherClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ProfileCreateWithoutAsParentInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutAsParentInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutAsParentInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAsParentInput, ProfileUncheckedCreateWithoutAsParentInput>
  }

  export type ProfileCreateWithoutAsStudentInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutAsStudentInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutAsStudentInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutAsStudentInput, ProfileUncheckedCreateWithoutAsStudentInput>
  }

  export type ParentNotificationCreateWithoutRelationshipInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
    parent: ProfileCreateNestedOneWithoutParentNotificationsInput
    student: ProfileCreateNestedOneWithoutStudentNotificationsInput
  }

  export type ParentNotificationUncheckedCreateWithoutRelationshipInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationCreateOrConnectWithoutRelationshipInput = {
    where: ParentNotificationWhereUniqueInput
    create: XOR<ParentNotificationCreateWithoutRelationshipInput, ParentNotificationUncheckedCreateWithoutRelationshipInput>
  }

  export type ParentNotificationCreateManyRelationshipInputEnvelope = {
    data: ParentNotificationCreateManyRelationshipInput | ParentNotificationCreateManyRelationshipInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutAsParentInput = {
    update: XOR<ProfileUpdateWithoutAsParentInput, ProfileUncheckedUpdateWithoutAsParentInput>
    create: XOR<ProfileCreateWithoutAsParentInput, ProfileUncheckedCreateWithoutAsParentInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAsParentInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAsParentInput, ProfileUncheckedUpdateWithoutAsParentInput>
  }

  export type ProfileUpdateWithoutAsParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAsParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUpsertWithoutAsStudentInput = {
    update: XOR<ProfileUpdateWithoutAsStudentInput, ProfileUncheckedUpdateWithoutAsStudentInput>
    create: XOR<ProfileCreateWithoutAsStudentInput, ProfileUncheckedCreateWithoutAsStudentInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutAsStudentInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutAsStudentInput, ProfileUncheckedUpdateWithoutAsStudentInput>
  }

  export type ProfileUpdateWithoutAsStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutAsStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ParentNotificationUpsertWithWhereUniqueWithoutRelationshipInput = {
    where: ParentNotificationWhereUniqueInput
    update: XOR<ParentNotificationUpdateWithoutRelationshipInput, ParentNotificationUncheckedUpdateWithoutRelationshipInput>
    create: XOR<ParentNotificationCreateWithoutRelationshipInput, ParentNotificationUncheckedCreateWithoutRelationshipInput>
  }

  export type ParentNotificationUpdateWithWhereUniqueWithoutRelationshipInput = {
    where: ParentNotificationWhereUniqueInput
    data: XOR<ParentNotificationUpdateWithoutRelationshipInput, ParentNotificationUncheckedUpdateWithoutRelationshipInput>
  }

  export type ParentNotificationUpdateManyWithWhereWithoutRelationshipInput = {
    where: ParentNotificationScalarWhereInput
    data: XOR<ParentNotificationUpdateManyMutationInput, ParentNotificationUncheckedUpdateManyWithoutRelationshipInput>
  }

  export type ProfileCreateWithoutParentNotificationsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    studentNotifications?: ParentNotificationCreateNestedManyWithoutStudentInput
  }

  export type ProfileUncheckedCreateWithoutParentNotificationsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    studentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type ProfileCreateOrConnectWithoutParentNotificationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutParentNotificationsInput, ProfileUncheckedCreateWithoutParentNotificationsInput>
  }

  export type ProfileCreateWithoutStudentNotificationsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationCreateNestedManyWithoutParentInput
  }

  export type ProfileUncheckedCreateWithoutStudentNotificationsInput = {
    id?: string
    updatedAt?: Date | string | null
    username?: string | null
    fullName?: string | null
    avatarUrl?: string | null
    email?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    teacherClasses?: ClassUncheckedCreateNestedManyWithoutTeacherInput
    studentEnrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    authorAnnouncements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    studentSubmissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    asParent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutParentInput
    asStudent?: ParentStudentRelationshipUncheckedCreateNestedManyWithoutStudentInput
    parentNotifications?: ParentNotificationUncheckedCreateNestedManyWithoutParentInput
  }

  export type ProfileCreateOrConnectWithoutStudentNotificationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutStudentNotificationsInput, ProfileUncheckedCreateWithoutStudentNotificationsInput>
  }

  export type ParentStudentRelationshipCreateWithoutNotificationsInput = {
    id?: string
    createdAt?: Date | string
    relationshipType?: string | null
    parent: ProfileCreateNestedOneWithoutAsParentInput
    student: ProfileCreateNestedOneWithoutAsStudentInput
  }

  export type ParentStudentRelationshipUncheckedCreateWithoutNotificationsInput = {
    id?: string
    parentId: string
    studentId: string
    createdAt?: Date | string
    relationshipType?: string | null
  }

  export type ParentStudentRelationshipCreateOrConnectWithoutNotificationsInput = {
    where: ParentStudentRelationshipWhereUniqueInput
    create: XOR<ParentStudentRelationshipCreateWithoutNotificationsInput, ParentStudentRelationshipUncheckedCreateWithoutNotificationsInput>
  }

  export type ProfileUpsertWithoutParentNotificationsInput = {
    update: XOR<ProfileUpdateWithoutParentNotificationsInput, ProfileUncheckedUpdateWithoutParentNotificationsInput>
    create: XOR<ProfileCreateWithoutParentNotificationsInput, ProfileUncheckedCreateWithoutParentNotificationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutParentNotificationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutParentNotificationsInput, ProfileUncheckedUpdateWithoutParentNotificationsInput>
  }

  export type ProfileUpdateWithoutParentNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    studentNotifications?: ParentNotificationUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutParentNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    studentNotifications?: ParentNotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ProfileUpsertWithoutStudentNotificationsInput = {
    update: XOR<ProfileUpdateWithoutStudentNotificationsInput, ProfileUncheckedUpdateWithoutStudentNotificationsInput>
    create: XOR<ProfileCreateWithoutStudentNotificationsInput, ProfileUncheckedCreateWithoutStudentNotificationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutStudentNotificationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutStudentNotificationsInput, ProfileUncheckedUpdateWithoutStudentNotificationsInput>
  }

  export type ProfileUpdateWithoutStudentNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUpdateManyWithoutParentNestedInput
  }

  export type ProfileUncheckedUpdateWithoutStudentNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacherClasses?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
    studentEnrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    authorAnnouncements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    studentSubmissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    asParent?: ParentStudentRelationshipUncheckedUpdateManyWithoutParentNestedInput
    asStudent?: ParentStudentRelationshipUncheckedUpdateManyWithoutStudentNestedInput
    parentNotifications?: ParentNotificationUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ParentStudentRelationshipUpsertWithoutNotificationsInput = {
    update: XOR<ParentStudentRelationshipUpdateWithoutNotificationsInput, ParentStudentRelationshipUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ParentStudentRelationshipCreateWithoutNotificationsInput, ParentStudentRelationshipUncheckedCreateWithoutNotificationsInput>
    where?: ParentStudentRelationshipWhereInput
  }

  export type ParentStudentRelationshipUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ParentStudentRelationshipWhereInput
    data: XOR<ParentStudentRelationshipUpdateWithoutNotificationsInput, ParentStudentRelationshipUncheckedUpdateWithoutNotificationsInput>
  }

  export type ParentStudentRelationshipUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: ProfileUpdateOneRequiredWithoutAsParentNestedInput
    student?: ProfileUpdateOneRequiredWithoutAsStudentNestedInput
  }

  export type ParentStudentRelationshipUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassCreateManyTeacherInput = {
    id?: string
    createdAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
  }

  export type EnrollmentCreateManyStudentInput = {
    id?: string
    createdAt?: Date | string
    classId: string
  }

  export type AnnouncementCreateManyAuthorInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    classId?: string | null
  }

  export type SubmissionCreateManyStudentInput = {
    id?: string
    createdAt?: Date | string
    assignmentId: string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
  }

  export type ParentStudentRelationshipCreateManyParentInput = {
    id?: string
    studentId: string
    createdAt?: Date | string
    relationshipType?: string | null
  }

  export type ParentStudentRelationshipCreateManyStudentInput = {
    id?: string
    parentId: string
    createdAt?: Date | string
    relationshipType?: string | null
  }

  export type ParentNotificationCreateManyParentInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationCreateManyStudentInput = {
    id?: string
    createdAt?: Date | string
    parentId: string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ClassUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: StringFieldUpdateOperationsInput | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    class?: ClassUpdateOneWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    classId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    classId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubmissionUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
    assignment?: AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubmissionUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ParentStudentRelationshipUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    student?: ProfileUpdateOneRequiredWithoutAsStudentNestedInput
    notifications?: ParentNotificationUpdateManyWithoutRelationshipNestedInput
  }

  export type ParentStudentRelationshipUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: ParentNotificationUncheckedUpdateManyWithoutRelationshipNestedInput
  }

  export type ParentStudentRelationshipUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentStudentRelationshipUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: ProfileUpdateOneRequiredWithoutAsParentNestedInput
    notifications?: ParentNotificationUpdateManyWithoutRelationshipNestedInput
  }

  export type ParentStudentRelationshipUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: ParentNotificationUncheckedUpdateManyWithoutRelationshipNestedInput
  }

  export type ParentStudentRelationshipUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    student?: ProfileUpdateOneRequiredWithoutStudentNotificationsNestedInput
    relationship?: ParentStudentRelationshipUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type ParentNotificationUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: ProfileUpdateOneRequiredWithoutParentNotificationsNestedInput
    relationship?: ParentStudentRelationshipUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type ParentNotificationUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnrollmentCreateManyClassInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
  }

  export type AssignmentCreateManyClassInput = {
    id?: string
    createdAt?: Date | string
    title: string
    description?: string | null
    dueDate: Date | string
    points?: number
  }

  export type AnnouncementCreateManyClassInput = {
    id?: string
    createdAt?: Date | string
    title: string
    content: string
    authorId: string
  }

  export type EnrollmentUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: ProfileUpdateOneRequiredWithoutStudentEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: IntFieldUpdateOperationsInput | number
    submissions?: SubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: IntFieldUpdateOperationsInput | number
    submissions?: SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateManyWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    points?: IntFieldUpdateOperationsInput | number
  }

  export type AnnouncementUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: ProfileUpdateOneRequiredWithoutAuthorAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementUncheckedUpdateManyWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type SubmissionCreateManyAssignmentInput = {
    id?: string
    createdAt?: Date | string
    studentId: string
    content?: string | null
    fileUrl?: string | null
    grade?: number | null
    feedback?: string | null
    isGraded?: boolean
  }

  export type SubmissionUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
    student?: ProfileUpdateOneRequiredWithoutStudentSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubmissionUncheckedUpdateManyWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    isGraded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ParentNotificationCreateManyRelationshipInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    content: string
    isRead?: boolean
    referenceId?: string | null
  }

  export type ParentNotificationUpdateWithoutRelationshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: ProfileUpdateOneRequiredWithoutParentNotificationsNestedInput
    student?: ProfileUpdateOneRequiredWithoutStudentNotificationsNestedInput
  }

  export type ParentNotificationUncheckedUpdateWithoutRelationshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParentNotificationUncheckedUpdateManyWithoutRelationshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}